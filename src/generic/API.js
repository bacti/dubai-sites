import axios from 'axios';
import CryptoJS	 from 'crypto-js';
import Cookies from 'js-cookie';

class API
{
	constructor()
	{
        this.apiURL = 'https://g4b.gameloft.com';
		if (window.location.toString().indexOf("localhost") >= 0)
		{
			// this.apiURL = 'http://localhost:5678';
			// this.apiURL = 'http://saiwks0500:5678';
			// this.apiURL = 'https://g4b.gameloft.com';
		}
	}

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------	

	RandInt(min, max)
	{
		return Math.floor((Math.random() * (max - min + 1)) + min);
	}

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------	

	GetRandomString()
	{
		let wordArray = CryptoJS.lib.WordArray.random(100).toString();
		return wordArray.substring(0, this.RandInt(12, 21));
	}

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------	

	GetHash(randomString, content)
	{
		return `${CryptoJS.SHA1(`${randomString}${content}${randomString}`).toString(CryptoJS.enc.Hex)}`;
	}
	
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------

	Request(method, url, config)
	{
		config['method']	= method;
		config['url']		= url;

		return axios(config);
	}	

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------

	CreateConfig(body)
	{
		let randomString = this.GetRandomString();
		let content = "";
		Object.keys(body).forEach(key =>
		{
			content += body[key];
		});

		let hash = this.GetHash(randomString, content)
		let config =
		{
			headers: {
				'content-type': 'application/json',
				'x-hash': hash,
				'x-random-string': randomString
			},
			data: body
		}

		return config;
	}

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------	

	SaveCookie(name, value)
	{				
		Cookies.set(name, value);
	}

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------	

	RemoveCookie(name)
	{
		Cookies.remove(name);
	}

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------

	GetCookieValue(name)
	{
		let value = Cookies.get(name);
		
		if (typeof(value)!=='undefined' && value!=='')
		{
			return value;
		}

		return '';
	}	

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------	

	GetUserIdentity()
	{
		return this.GetCookieValue('UAT');
	}

	SaveUserIdentity(value)
	{
		this.SaveCookie('UAT', value);
	}

	RemoveUserIdentity()
	{
		this.RemoveCookie('UAT');
	}

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------

	async CreateUser(body)
	{
		let config = this.CreateConfig(body);
		const userData = await this.Request('post', `${this.apiURL}/api/pub/dubaishopping/register`, config);

		if (userData.data.code === 200)
		{
			this.SaveUserIdentity(userData.data.profile.token);
			return {
						logged: true,
						data: userData.data.profile
					};
		}
		else
		{
			return {
				logged: false,
				data: {}
			};
		}
	}	

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------

	async UserLogin(body)
	{
		const showWC = (this.GetCookieValue('Show_WC') == '') ? true : false;

		let data = {
			showWC,
			logged: false,
			tutorialFinished: false,
			currentWeek: 0,
			currentStep: 1,
			userData: {},
			loggedFail: true
		}		

		let uat = this.GetUserIdentity();
		if ( uat != '' ) // if exists token
		{
			const profile = await this.GetUserProfile(uat);
			if (Object.keys(profile).length > 0)
			{
				data.logged = true;
				data.tutorialFinished = profile.tutorialFinished;
				data.currentWeek = profile.currentWeek;
				data.currentStep = profile.currentStep;
				data.userData = profile.basic_infos;
				data.loggedFail = false;
			}
		}
		else
		{
			// if not, call login
			let config = this.CreateConfig(body);
			const userData = await this.Request('post', `${this.apiURL}/api/pub/dubaishopping/login`, config).catch(e=>{return {}});
			// console.log(userData);
			
			if (userData.data && userData.data.code === 200)
			{
				this.SaveUserIdentity(userData.data.profile.token);

				data.logged = true;
				data.tutorialFinished = userData.data.profile.tutorialFinished;
				data.currentWeek = userData.data.profile.currentWeek;
				data.currentStep = userData.data.profile.currentStep;
				data.userData = userData.data.profile.basic_infos;
				data.loggedFail = false;
			}
		}
		return data;
    }
	
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------

	async ForgetPass(body) {
		let config = this.CreateConfig(body);
		const data = await this.Request('post', `${this.apiURL}/api/pub/dubaishopping/forgot`, config);
		return data;
	}

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------

	async GetLocationType()
	{				
		let body = {
			params : {}
		}

		const type = await this.Request('get', `${this.apiURL}/api/pub/dubaishopping/locationtype`, body);

		console.log(type.data);
		
		return type.data.locationtype;
	}

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------

	async GetUserProfile(uat)
	{		
		let body = {
			params : {
				token: uat
			}
		}
		const dataProfile = await this.Request('get', `${this.apiURL}/api/pub/dubaishopping/profile`, body).catch(e=>{return {}});

		if (dataProfile.data.code === 200)
		{
			return dataProfile.data.profile;
		}
		else
		{
			return {};
		}
	}	

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
	
	async CheckLocationAndLocalData()
	{
		// const locationType = 'type_2';
		const locationType = await this.GetLocationType().catch(e => {return 'type_3'});
		const leaderboard = {record: await this.GetLeaderboard().catch(e=>{return []}), my_entry: await this.GetMyEntry().catch(e=>{return null})};
		const showWC = (this.GetCookieValue('Show_WC') == '') ? true : false;

		console.log('showWC :' + showWC);
		console.log('type :' + locationType);
		
		let data = {
			showWC,
			type: locationType,			
			logged: false,
			leaderboard,
			tutorialFinished: false,
			currentWeek: 0,
			currentStep: 1,
			userData: {}
		}

		if (locationType !== 'type_3')
		{
			let uat = this.GetUserIdentity();
			// console.log('uat :' + uat);			
			if ( uat != '' )  // if exists token
			{
				const profile = await this.GetUserProfile(uat).catch(e=>{return {}});
				if (Object.keys(profile).length > 0)
				{					
					data.logged = true;
					data.tutorialFinished = profile.tutorialFinished;
					data.currentWeek = profile.currentWeek;
					data.currentStep = profile.currentStep;
					data.userData = profile.basic_infos;
					data.vouchers = profile.vouchers;
				}
			}
		}
		console.log('userInfo');
		console.log(data);
		return data;
	}

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------

	async StartTransaction(gameUrl, locationType)
	{
		let identity = this.GetUserIdentity();
		let resultUrl = gameUrl + `&identity=&transaction=&location=${locationType}&language=EN`;
		console.log('StartTransaction');
		console.log('identity: ' + identity);
		

		if (locationType != 'type_3' && identity != '')
		{
			let body = {
				params : {
					token: identity
				}
			}
			
			const response = await this.Request('get', `${this.apiURL}/api/pub/dubaishopping/transaction`, body);
			console.log('StartTransaction 2');
			console.log(response);
			if (response.data.code == 200)
			{
				resultUrl = gameUrl + `&identity=${identity}&transaction=${response.data.transaction}&location=${locationType}`;
			}		
		}		

		return {url : resultUrl};
	}
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------	

	async GetLeaderboard(offset = 0, limit = 100) {
		let body = {
			params: {
				token: this.GetUserIdentity(),
				offset,
				limit
			}
		}
		const result = await this.Request('get', `${this.apiURL}/api/pub/dubaishopping/leaderboard`, body).catch(e => { return [] });


		if (result.data && result.data.code === 200) {
			return result.data.leaderboard;
		}
		else {
			return [];
		}
	}

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------	

	async GetMyEntry()
	{
		let body = {
			params: {
				token: this.GetUserIdentity(),
			}
		}

		const result = await this.Request('get', `${this.apiURL}/api/pub/dubaishopping/leaderboard/me`, body).catch(e => { return null });

		if (result.data && result.data.code === 200) {
			return result.data.my_entry;
		}
		else {
			return null;
		}
	}

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------

	async EndTutorial()
	{
		let uat = this.GetUserIdentity();
		if ( uat != '' )  // if exists token
		{
			let body = {
				token: uat,
				tutorialFinished: true,
				currentStep: 1
			}
			let config = this.CreateConfig(body);
			const result = await this.Request('post', `${this.apiURL}/api/pub/dubaishopping/profile`, config).catch(e => { return false });

			if (result.data && result.data.code === 200) {
				return true;
			}
			else {
				return false;
			}
		}
		return false;
	}

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------

	async UpdateStep(nextStep)
	{			
		let uat = this.GetUserIdentity();
		if ( uat != '' )  // if exists token
		{
			let body = {
				token: uat,
				tutorialFinished: true,
				currentStep: nextStep
			}
			let config = this.CreateConfig(body);
			const result = await this.Request('post', `${this.apiURL}/api/pub/dubaishopping/profile`, config).catch(e => { return false });

			if (result.data && result.data.code === 200) {
				return true;
			}
			else {
				return false;
			}
		}
		return false;
	}
}

export default new API();