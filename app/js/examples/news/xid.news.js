import {
    handleXIDLogin,
    isUserLoggedIn
} from './app.news';
import ToastHelper from '../../helper/toast-helper';

function onXIDLoaded() {
    const loginButtonElement = document.querySelector( '#login-button' );
    loginButtonElement.disabled = false;

    doInitXID();
    if ( !isUserLoggedIn() ) {
        doLoginWithXID( {noStepup: true} );
    }
}

function doInitXID() {
    if ( !window.XID ) {
        return console.warn( 'xID not loaded yet' );
    }

    window.XID.doInit( {
        client_id: 'xIDNews',
        client_type: 'XID',
        scope: 'openid phone address',
        noStepup: false,
        method: 'inline',
        redirect_uri: '{data_xidOauthRedirectUri}',
        oauth_url: '{data_xidOauthEndpoint}',
        token_endpoint: '{data_xidOauthTokenUrl}',
        userinfo_endpoint: '{data_xidOauthUserInfoUrl}'
    } );
}

function doLoginWithXID( config = {} ) {
    if ( !window.XID ) {
        return console.warn( 'xID not loaded yet' );
    }

    window.XID.doConnect( {
        callback: ( err, accessToken ) => {
            console.log( 'doConnectCallback', accessToken );
            if ( err ) {
                console.error( 'doLoginWithXID', err );
                if ( isUserLoggedIn() ) {
                    handleXIDLogin( null );
                }
            }
            else {
                window.XID.doGetUserInfo( ( err, user ) => handleXIDLogin( user || null ) );
            }
        },
        config: config,
        inlineElementID: 'authenticate-client',
        inlineModalWindow: true
    } );
}

function doLogoutFromXID() {
    if ( !window.XID ) {
        return console.warn( 'xID not loaded yet' );
    }

    window.XID.doLogout();

    handleXIDLogin( null );

    const toastContainerElement = document.querySelector( '.toast-wrapper' );
    ToastHelper.showToast( toastContainerElement, 'Logget ut' );
}

function doSwitchUserXID() {
    doLogoutFromXID();
    // Remove xID Cookie
    window.XID.doReset();
    doLoginWithXID( {client_type: ''} );
}

export {
    doLoginWithXID,
    doSwitchUserXID,
    doLogoutFromXID,
    onXIDLoaded
};