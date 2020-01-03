Number.prototype.toRad = function()
{
    return this * Math.PI / 180
}

export default
{
    APP_BAR_HEIGHT: 56,
    PAGE_PADDING: 24,
    Steps:
    {
        PLAY_1: 1,
        UNLOCK_2: 2.4,
        PLAY_2: 2,
        UNLOCK_3: 3.4,
        PLAY_3: 3,
    },
    PLACES:
    [
        {
            name: 'Gameloft SAI',
            latitude: 10.8089925,
            longitude: 106.71319,
            radius: 1200,
        },
        {
            name: 'Gameloft JOG2',
            latitude: -7.796703,
            longitude: 110.352415,
            radius: 1200,
        },
        { name: 'Mall of the Emirates', latitude: 25.1181, longitude: 55.2006, radius: 500, x: 527, y: 194, address:'Sheikh Zayed Rd - Dubai - United Arab Emirates',website:'www.malloftheemirates.com',phone:'+971 4 409 9000',googlemap:'https://smarturl.it/jwnv71'},
        { name: 'City Centre Deira', latitude: 25.25196, longitude: 55.3328, radius: 400, x: 991, y: 198, address:'8th St - Dubai - United Arab Emirates',website:'www.citycentredeira.com',phone:'+971 4 209 3105',googlemap:'https://smarturl.it/4d7gsa'},
        { name: 'City Centre Mirdif', latitude: 25.21631, longitude: 55.40779, radius: 500, x: 999, y: 365, address:'Sheikh Mohammed Bin Zayed Rd - Dubai - United Arab Emirates',website:'www.citycentremirdif.com',phone:'+971 4 602 3000',googlemap:'https://smarturl.it/4uts7c'},
        { name: 'The Pointe', latitude: 25.1256, longitude: 55.12366, radius: 700, x: 458, y: -1, address:'Palm Jumeirah - Al Mirziban - Dubai - United Arab Emirates',website:'www.thepointe.ae',phone:'+971 4 390 9999',googlemap:'https://smarturl.it/nmb3x9'},
        { name: 'Ibn Battuta Mall', latitude: 25.04454, longitude: 55.12029, radius: 650, x: 301, y: 218, address:'Sheikh Zayed Rd - Dubai - United Arab Emirates',website:'www.ibnbattutamall.com',phone:'+971 4 368 5543',googlemap:'https://smarturl.it/e6lryw'},
        { name: 'Nakheel Mall', latitude: 25.11431, longitude: 55.13875, radius: 250, x: 451, y: 74, address:'Center of Palm - Al Hilali - Dubai - United Arab Emirates',website:'www.nakheelmall.ae',phone:'+971 4 390 9999',googlemap:'https://smarturl.it/t5lzyk'},
        { name: 'Boxpark by Meraas', latitude: 25.202, longitude: 55.25078, radius: 300, x: 719, y: 135, address:'Al Wasl Rd - Dubai - United Arab Emirates',website:'www.boxpark.ae',phone:'+971 4 317 399',googlemap:'https://smarturl.it/2gsewe'},
        { name: 'City Walk by Meraas', latitude: 25.20729, longitude: 55.263, radius: 500, x: 785, y: 146, address:'Al Safa St - Dubai - United Arab Emirates',website:'www.citywalk.ae',phone:'+971 800 637227',googlemap:'https://smarturl.it/18yfbc'},
        { name: 'Al Seef by Meraas', latitude: 25.26026, longitude: 55.30939, radius: 500, x: 926, y: 154, address:'Al Seef St - Dubai - United Arab Emirates',website:'www.alseef.ae',phone:'+971 800 637227',googlemap:'https://smarturl.it/jvlj7j'},
        { name: 'Bluewaters Island', latitude: 25.07962, longitude: 55.1224, radius: 900, x: 249, y: 85, x: 249, y: 85, address:'Bluewaters Island - Dubai - United Arab Emirates',website:'N/A',phone:'N/A',googlemap:'https://smarturl.it/jur3n9'},
        { name: 'Last Exit Al Khawaneej by Meraas', latitude: 25.23434, longitude: 55.47476, radius: 200, x: 1132, y: 429, address:'Dubai - United Arab Emirates',website:'www.lastexit.ae',phone:'+971 4 317 3999',googlemap:'https://smarturl.it/2e1ul6'},
        { name: 'The Outlet Village by Meraas', latitude: 24.9126, longitude: 55.01048, radius: 300, x: 78, y: 351, address:'Jebel Ali, Near Dubai Parks and Resorts - Dubai - United Arab Emirates',website:'www.theoutletvillage.ae',phone:'+971 4 317 3999',googlemap:'https://smarturl.it/agrt7t'},
        { name: 'The Beach by Meraas', latitude: 25.0759, longitude: 55.13127, radius: 700, x: 315, y: 117, address:'Opposite JBR - دبي - United Arab Emirates',website:'www.thebeach.ae',phone:'+971 4 317 3999',googlemap:'https://smarturl.it/wg3win'},
        { name: 'La Mer by Meraas', latitude: 25.22855, longitude: 55.25822, radius: 700, x: 812, y: 105, address:'2 A St - Dubai - United Arab Emirates',website:'www.lamerdubai.ae',phone:'+971 800 637227',googlemap:'https://smarturl.it/nbot0d'},
        { name: 'Dubai Mall', latitude: 25.19746242,longitude: 55.27915805, radius: 600, x: 745, y: 260, address:'Dubai - United Arab Emirates',website:'N/A',phone:'N/A',googlemap:"https://smarturl.it/eox36l"},
        { name: 'Dubai Marina Mall', latitude: 25.07642, longitude: 55.1405, radius: 400, x: 363, y: 139, address:'Sheikh Zayed Rd - إمارة دبيّ - United Arab Emirates',website:'www.dubaimarinamall.com',phone:'+971 4 436 1020',googlemap:'https://smarturl.it/eptw7e'},
        { name: 'Dubai Festival City Mall', latitude: 25.22291, longitude: 55.35246, radius: 400, x: 987, y: 306, address:'Festival Boulevard, Dubai Festival City - Dubai - United Arab Emirates',website:'www.dubaifestivalcitymall.com',phone:'+971 800 332',googlemap:'https://smarturl.it/dqewlf'},
        { name: 'Festival Plaza', latitude: 25.02927, longitude: 55.108, radius: 500, x: 152, y: 277, address:'Dubai - United Arab Emirates',website:'www.dubaifestivalplaza.com',phone:'N/A',googlemap:'https://smarturl.it/hxx329'},
        { name: 'Mercato Shopping Mall', latitude: 25.21645, longitude: 55.25298, radius: 200, x: 836, y: 148, address:'Jumeirah Beach Rd - دبي - United Arab Emirates',website:'www.mercatoshoppingmall.com',phone:'+971 4 344 4161',googlemap:'https://smarturl.it/y6rwvm'}
        // { name: 'Burj Park by Emaar', latitude: 25.19438, longitude: 55.27355, radius: 100, x: 761, y: 224, address:'Burj Khalifa - Burj Khalifa Blvd - Dubai - United Arab Emirates',website:'www.emaar.com',googlemap:'https://smarturl.it/6vz3cf'},
    ],
    GAME_URLS:
    [
        // // dev
        // 'https://oms.gameloft.com/iframe/?message=U2FsdGVkX19R3UXSzg30gb69D6cMCIHsIPei0odl5QTcM0ibODskUfOh%2Ff%2FSR71h49IBmOCcH9YpRpT86%2F1kgrv97Lvs8k7LJc4fprw8TvI%3D',
        // 'https://oms.gameloft.com/iframe/?message=U2FsdGVkX1%2BXHLa%2BNNjFaBAv4vcYyCMynsXPc3uuP1vKEIw02hiyWHTdYsy%2BeeyvG84pLdrVcThgUCyFKxw0X4plyUeNzeb6%2FGDYXR9fKhk%3D',
        // 'https://oms.gameloft.com/iframe/?message=U2FsdGVkX19R3UXSzg30gb69D6cMCIHsIPei0odl5QTcM0ibODskUfOh%2Ff%2FSR71h49IBmOCcH9YpRpT86%2F1kgrv97Lvs8k7LJc4fprw8TvI%3D',
        // review
        'https://oms.gameloft.com/iframe/?message=U2FsdGVkX1%2FRLMz4wCKcHmupPEdeqpztcqJSG3jlo%2BwLw3vUo24dmcrY7BnS%2FeA2p2%2FBRiu7HKloHX9qUo9V5aOIRmIv62gnqS%2BToY58DJo%3D',
        'https://oms.gameloft.com/iframe/?message=U2FsdGVkX1%2BkG%2BcL0S02bc5nMqF9%2F4jsQeg83cjziSMlwzwECImKJcpQXEm3G1TsxtgLIcRTe43iTRge24EBPjuJqO4aOHZtNDhSImGoNzM%3D',
        'https://oms.gameloft.com/iframe/?message=U2FsdGVkX19R3UXSzg30gb69D6cMCIHsIPei0odl5QTcM0ibODskUfOh%2Ff%2FSR71h49IBmOCcH9YpRpT86%2F1kgrv97Lvs8k7LJc4fprw8TvI%3D',
    ],

    GetDistance: (location, destination) =>
    {
        const { latitude: lat1, longitude: lon1 } = location
        const { latitude: lat2, longitude: lon2 } = destination
        const R = 6371 * 1000 // radius of the earth in metres
        const dLat = (lat2 - lat1).toRad()
        const dLon = (lon2 - lon1).toRad() 
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
            + Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
        const c = 2 * Math.atan2(a ** 0.5, (1 - a) ** 0.5)
        const d = R * c
        return d
    },
}
