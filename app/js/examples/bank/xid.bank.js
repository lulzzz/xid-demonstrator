import {
    doSetLoggedIn,
    doRedirectToPage
} from './app.bank';
import CONSTANTS from './constants.bank';

let xIDInitLoaded = false;

function doLogoutFromXID() {
    if ( !window.XID ) {
        return console.warn( 'xID not loaded yet' );
    }
    window.XID.doLogout();
}

function doInitXID() {
    if ( !window.XID ) {
        return console.warn( 'xID not loaded yet' );
    }

    window.XID.doInit( {
        client_id: 'xIDBank',
        client_type: '',
        scope: 'openid standard_bankid',
        unsolicited: false,
        method: 'inline',
        redirect_uri: '{data_xidOauthRedirectUri}',
        oauth_url: '{data_xidOauthEndpoint}',
        token_endpoint: '{data_xidOauthTokenUrl}',
        userinfo_endpoint: '{data_xidOauthUserInfoUrl}'
    } );

    xIDInitLoaded = true;
}

function doLoginWithXID() {
    if ( !window.XID ) {
        return console.warn( 'xID not loaded yet' );
    }

    if ( !xIDInitLoaded ) {
        return console.warn( 'xID init not loaded yet' );
    }

    const inlineElement = document.querySelector( '#authenticate-client' );
    inlineElement.style.display = 'block';

    if ( inlineElement.hasChildNodes() ) {
        return console.warn( 'session already in progress' );
    }

    const $loginPage = document.querySelector( 'section#login-page' );

    window.XID.doConnect( {
        callback: ( err, accessToken ) => {
            console.log( 'doLoginWithXID', err, accessToken );
            $loginPage.classList.remove( 'is-authenticating' );

            const $loginMessage = document.querySelector( '#login-message' );

            if ( err ) {
                console.error( 'doLoginWithXID', 'doConnect', err );
                $loginMessage.innerText = 'Authentication failure';
                return;
            }

            $loginMessage.innerText = 'Authenticated';

            window.XID.doGetUserInfo( ( err, userInfo ) => {
                if ( err ) {
                    console.error( 'doLoginWithXID', 'doGetUserInfo', err );
                    $loginMessage.innerText = 'Get user info failure';
                    return;
                }

                console.log( 'doLoginWithXID', 'doGetUserInfo', userInfo );
                doSetLoggedIn( true );
                doRedirectToPage( CONSTANTS.PAGE_NAME_OVERVIEW );
            } );
        },
        inlineOnLoadCallback: () => {
            console.log( 'doLoginWithXID', 'onLoadCallback' );
            $loginPage.classList.add( 'is-authenticating' );
        },
        inlineElementID: 'authenticate-client'
    } );
}

export {
    doLoginWithXID,
    doLogoutFromXID,
    doInitXID
};