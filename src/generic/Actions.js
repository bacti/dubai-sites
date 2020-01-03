import MD5 from 'md5'
import TrackingManager from 'ets-tracking'
import API from './API'
import Defines from './Defines'
const { Steps } = Defines

export default (store, props) =>
({
    CheckLocationAndLocalData: state =>
    {        
        API.CheckLocationAndLocalData()
        .then
        (
            data => store.setState
            ({
                ...state,
                showWC: data.showWC,
                loading: false,
                locationType: data.type,
                logged: data.logged,
                userData: data.userData,
                leaderboard: data.leaderboard,
                tutorialFinished: data.tutorialFinished,
                currentWeek: data.currentWeek,
                currentStep: data.currentStep,
                vouchers: data.vouchers || [],
            })
        )
        .catch
        (
            err => store.setState
            ({
                ...state,
                loading: false,
                locationType: 'type_3',
                logged: false,
                tutorialFinished: false,
                currentWeek: 0,
                currentStep: 1,
                vouchers: [],
            })
        )
    },
    OnTutorial: ({ tutorialStep }, currentStep) => ({ currentStep, tutorialStep: tutorialStep + 1 }),
    EndTutorial: state =>
    {
        store.setState({ ...state, tutorialFinished: true, tutorialStep: 1 })
        API.EndTutorial()
    },
    UnlockMap: (state) => {
        if (state.locationType == 'type_1')
        {
            API.UpdateStep(~~state.currentStep)
                .then( _ => {store.setState({ ...state, currentStep: ~~state.currentStep })} )
                .catch(err => {})
        }
    },
    SignIn: (state, data, callback) => {
        store.setState({
            ...state,
            loading: true,
        });
        API.UserLogin(data, state.locationType)
        .then(data =>
        {
            store.setState({
                ...state,
                showWC: data.showWC,
                loading: false,
                // locationType: data.type,
                logged: data.logged,
                userData: data.userData,
                // leaderboard: data.leaderboard,
                tutorialFinished: data.tutorialFinished,
                currentWeek: data.currentWeek,
                currentStep: data.currentStep,
                vouchers: data.vouchers || [],
            })
            if (data.loggedFail)
                callback()
            else
            {
                const { email } = data.userData
                TrackingManager.SendEventTracking(window.TRACKING_ACTION_FORM_LEAD, MD5(email))
            }
        })
        .catch(err=>{
            store.setState({
                ...state,
                loading: false,
                locationType: 'type_3',
                logged: false,
                tutorialFinished: false,
                currentWeek: 0,
                currentStep: 1,
                vouchers: [],
            })
            callback()
        })
    },
    SignOut: (state) => {
        API.RemoveUserIdentity();        
        store.setState({
            ...state,
            loading: false,
            logged: false,
            currentStep: 1,
            userData: {}
        })
    },
	ForgetPass: (state, data, resolve, reject) => {
        store.setState({
            ...state,
            loading: true,
        });
        
        API.ForgetPass(data)
            .then(res => {
                store.setState({
                    ...state,
                    loading: false,
                    
                });
                resolve(res.data && res.data.code == 200);
            })
            .catch(err => {
                store.setState({
                    ...state,
                    loading: false,
                });
                reject();
            })

	},
    CreateUser: (state, data) => {
        store.setState({
            ...state,
            loading: true,
        });
        API.CreateUser(data)
        .then(profile =>
        {
            const { email } = data
            TrackingManager.SendEventTracking(window.TRACKING_ACTION_FORM_LEAD, MD5(email))
            window.bk_async(email)
            store.setState
            ({
                ...state,
                loading: false,
                logged: profile.logged,
                userData: profile.data
            })
        })
        .catch(err => {
            store.setState({
                ...state,
                loading: false,
                logged: false,
                userData: {}
            })
        })
    }, 
    ToggleMenu: (state, menuOpened) => ({ menuOpened }),
    StartGame: (state, gameUrl) => { 
        API.StartTransaction(gameUrl, state.locationType)
            .then(data => {
                store.setState({
                    ...state,
                    gameUrl: data.url
                })
                console.log(data.url);                
            })
            .catch(err => {
                store.setState({
                    ...state,
                    loading: false
                })
            })
    },
    ExitGame: (state, showReward) => ({ gameUrl: null, showReward }),
    HideReward: state => ({ showReward: undefined }),
    UpdateStep: state =>
    {
        const { currentStep } = state
        const nextStep = currentStep < Steps.PLAY_3 ? currentStep + 1.4 : currentStep
        if (state.locationType == 'type_1')
        {
            API.UpdateStep(nextStep)
                .then( evt => { store.setState({ ...state, currentStep: nextStep }) })
                .catch(err => {})
        }
    },
    CloseWC: (state) => {        
        API.SaveCookie('Show_WC', false);
        store.setState({ ...state, showWC: false })
    },
})


