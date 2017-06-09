import '../../polyfill';

import {applyBindings} from '../../lib/binder';
import {observable} from '../../lib/observer';

import DomHelper from '../../helper/dom-helper';
import ToastHelper from '../../helper/toast-helper';

import Popover from '../../component/popover.component';

import CONSTANTS from './constants.news';

import {
    doStoreUser,
    getLoggedInUser
} from './store.news';
import {
    doLoginWithXID,
    doLogoutFromXID,
    doSwitchUserXID,
    onXIDLoaded
} from './xid.news';

// VARIABLES
let isContentLoaded = false;

const loginButtonElement = document.querySelector( '#login-button' );
const menuButtonElement = document.querySelector( '#menu-button' );
const toastContainerElement = document.querySelector( '.toast-wrapper' );

// VIEW MODELS
const weatherVm = observable( {
    icon: '',
    text: '',
    color: '',
    subtext: ''
} );

const stockVm = observable( {
    icon: 'data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjRkZGIiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTYgNmwyLjI5IDIuMjktNC44OCA0Ljg4LTQtNEwyIDE2LjU5IDMuNDEgMThsNi02IDQgNCA2LjMtNi4yOUwyMiAxMlY2eiIvPjxwYXRoIGQ9Ik0wIDBoMjR2MjRIMHoiIGZpbGw9Im5vbmUiLz48L3N2Zz4=',
    text: '+5,96',
    color: 'green',
    subtext: 'OSBEX'
} );

const latestNewsVm = observable( {
    text: 'Phasellus congue sapien at urna',
    time: '11:28'
} );

const newsVm = {
    main: observable( [] ),
    sidebar: observable( [] ),
    bottom: observable( [] )
};

const adsVm = observable( {
    primary: 'img/article/Fjordkraft.png',
    secondary: 'img/article/BankID_ad.png'
} );

// FUNCTIONS

function getUserPlace() {
    const user = getLoggedInUser();
    if ( user ) {
        return user.address && user.address.locality || 'Oslo';
    }
    else {
        return 'Bergen';
    }
}

function isUserLoggedIn() {
    return !!getLoggedInUser();
}

/**
 * @param {BIDXidConnect.UserInfo} [user]
 */
function handleXIDLogin( user ) {
    console.log( 'handleXIDLogin', user );
    doStoreUser( user );

    if ( user ) {
        loginButtonElement.disabled = true;
        loginButtonElement.classList.remove( 'visible' );

        menuButtonElement.disabled = false;
        menuButtonElement.classList.add( 'visible' );

        menuButtonElement.querySelector( 'span' ).innerText = user.name;

        ToastHelper.showToast( toastContainerElement, 'Innholdet er tilpasset' );
    }
    else {
        loginButtonElement.disabled = false;
        loginButtonElement.classList.add( 'visible' );

        menuButtonElement.disabled = true;
        menuButtonElement.classList.remove( 'visible' );
    }

    doUpdateContent();
}

function doUpdateContent() {
    if ( !isContentLoaded ) {
        return doPopulateContent();
    }

    DomHelper.addAnimationClass( document.body, 'customizing' )
        .then( () => {
            doPopulateContent();
            return new Promise( fulfill => setTimeout( fulfill, 250 ) );
        } )
        .then( () => {
            return DomHelper.addAnimationClass( document.body, 'customizing--remove' );
        } )
        .then( () => {
            document.body.classList.remove( 'customizing' );
            document.body.classList.remove( 'customizing--remove' );
        } );
}

function doPopulateContent() {
    const type = isUserLoggedIn() ? 'customise' : 'default';

    Object.keys( newsVm ).forEach( key => {
        const length = newsVm[key].length;

        for ( let i = 0; i < length; i++ ) {
            newsVm[key].pop();
        }
    } );

    Object.keys( CONSTANTS.NEWS[type] ).forEach( key => {
        CONSTANTS.NEWS[type][key].forEach( article => {
            let articlePrepared = Object.assign( {}, article );

            if ( articlePrepared.title ) {
                articlePrepared.title = articlePrepared.title.replace( /{{place}}/ig, getUserPlace() );
            }

            newsVm[key].push( articlePrepared );
        } );
    } );

    Object.keys( adsVm ).forEach( key => {
        adsVm[key] = CONSTANTS.ADS[type][key];
    } );

    Object.keys( weatherVm ).forEach( key => {
        weatherVm[key] = CONSTANTS.WEATHER[type][key];
    } );

    doUpdateWeather();

    isContentLoaded = true;
}

function doUpdateWeather() {
    const place = getUserPlace();

    const updateWeatherFromYahoo = ( temperatureFahrenheit, place, code ) => {
        let icon = weatherVm.icon;

        Object.keys( CONSTANTS.WEATHER_YAHOO_CODE ).forEach( key => {
            if ( CONSTANTS.WEATHER_YAHOO_CODE[key].indexOf( code ) !== -1 ) {
                icon = CONSTANTS.WEATHER_ICON[key];
            }
        } );

        weatherVm.text = `${Math.round( (temperatureFahrenheit - 32) * 5 / 9 )}°C`;
        weatherVm.subtext = place;
        weatherVm.icon = icon;
    };

    if ( !window.fetch ) {
        weatherVm.subtext = place;
        return;
    }

    window.fetch( 'https://query.yahooapis.com/v1/public/yql' +
        '?q=' + encodeURIComponent( `select item.condition from weather.forecast where woeid in (select woeid from geo.places(1) where text="${place}, norway")` ) +
        '&format=json' )
        .then( response => response.json() )
        .then( result => {
            if ( result['query']['count'] > 0 && result['query']['results'] && result['query']['results']['channel'] && result['query']['results']['channel']['item'] && result['query']['results']['channel']['item']['condition'] ) {
                updateWeatherFromYahoo(
                    parseInt( result['query']['results']['channel']['item']['condition']['temp'] ),
                    place,
                    parseInt( result['query']['results']['channel']['item']['condition']['code'] ) );
            }
            else {
                console.warn( 'doUpdateWeather', 'Could not update weather', result );
            }
        } )
        .catch( console.error.bind( null, 'doUpdateWeather' ) );
}

function loadImages() {
    const images = [];

    Object.keys( CONSTANTS.NEWS ).forEach( type => {
        Object.keys( CONSTANTS.NEWS[type] ).forEach( key => {
            CONSTANTS.NEWS[type][key].forEach( article => {
                if ( article.image ) {
                    images.push( DomHelper.loadImagePromise( article.image ) );
                }
            } );
        } );
    } );

    Object.keys( CONSTANTS.ADS ).forEach( type => {
        Object.keys( CONSTANTS.ADS[type] ).forEach( key => images.push( DomHelper.loadImagePromise( CONSTANTS.ADS[type][key] ) ) );
    } );

    return Promise.all( images );
}

applyBindings( document.body, {
    weather: weatherVm,
    stock: stockVm,
    news: newsVm,
    ads: adsVm,
    latestNews: latestNewsVm
} );

function doInit() {
    handleXIDLogin( getLoggedInUser() );

    loadImages()
        .then( () => document.body.classList.add( 'active' ) );

    const menuPopover = new Popover( document.querySelector( '[data-popover=menu]' ), menuButtonElement );
    menuPopover.initPopover();

    const loginButtonElement = document.querySelector( '#login-button' );
    const logoutButtonElement = document.querySelector( '#logout-button' );
    const switchUserButtonElement = document.querySelector( '#switch-user-button' );

    loginButtonElement.addEventListener( 'click', doLoginWithXID, false );
    logoutButtonElement.addEventListener( 'click', doLogoutFromXID, false );
    switchUserButtonElement.addEventListener( 'click', doSwitchUserXID, false );

    document.body.addEventListener( 'xid-loaded', onXIDLoaded, false );
}

export {
    doInit,
    isUserLoggedIn,
    handleXIDLogin
};