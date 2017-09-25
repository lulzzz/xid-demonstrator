import {
    handleXIDLogin,
    isUserLoggedIn
} from './app.news';

import {doStoreUser, isUserDataSet} from './store.news';
import ToastHelper from '../../helper/toast-helper';

const APPLICATION_NAME = 'nyhetsportal.no';

function onXIDLoaded( doXIDConnectOnloadCallback ) {
    const loginButtonElement = document.querySelector( '#login-button' );
    loginButtonElement.disabled = false;

    doInitXID();
    if ( !isUserLoggedIn() ) {
        if ( isUserDataSet() ) {
            // User probably logged in before
            doLoginWithXID( doXIDConnectOnloadCallback, {unsolicited: true, scope: 'openid standard_bankid'} );
        } else {
            // First time for this user
            doLoginWithXID( doXIDConnectOnloadCallback, {unsolicited: true} );
        }
    }
}

function onXIDClick( doXIDConnectOnClickCallback ) {
    if ( !isUserLoggedIn() ) {
        if ( isUserDataSet() ) {
            // User probably logged in before
            doLoginWithXID( doXIDConnectOnClickCallback, {}, APPLICATION_NAME );
        } else {
            // First time for this user
            doLoginWithXID( doXIDConnectOnClickCallback, {}, APPLICATION_NAME );
        }
    }
}

function doInitXID() {
    if ( !window.XID ) {
        return console.warn( 'xID not loaded yet' );
    }

    window.XID.doInit( {
        client_id: 'xIDNews',
        client_type: 'XID',
        scope: 'openid standard_bankid phone address',
        unsolicited: false,
        method: 'inline',
        redirect_uri: '{data_xidOauthRedirectUri}',
        oauth_url: '{data_xidOauthEndpoint}',
        token_endpoint: '{data_xidOauthTokenUrl}',
        userinfo_endpoint: '{data_xidOauthUserInfoUrl}'
    } );
}

function doLoginWithXID( doConnectCallback, config = {}, applicationName = null ) {
    if ( !window.XID ) {
        return console.warn( 'xID not loaded yet' );
    }
    console.log('applicationName', applicationName);
    window.XID.doConnect( {
        callback: doConnectCallback,
        config: config,
        inlineElementID: 'authenticate-client',
        inlineModalWindow: true,
        applicationName: applicationName,
        onActionCallback: onAction
    } );
}

function onAction( action ) {
    let modalElement = document.querySelector('[data-dialog=xid-login-modal] main');
    let modalArticleElement = modalElement.querySelector('article');

    if ( modalElement ) {
        // Hack for the xID demonstrator with additional information support
        if ( action === 'add' ) {
            modalElement.style.height = '750px';
            modalArticleElement.style.height = '750px';

        } else {
            modalElement.style.height = '';
            modalArticleElement.style.height = '';
        }
    }



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

function doSwitchUserXID(doXIDConnectCallback) {
    doLogoutFromXID();
    // Remove xID Cookie
    window.XID.doReset();
    doLoginWithXID( doXIDConnectCallback );
}

function doGetUserInfoXID() {
    window.XID.doGetUserInfo( handleUserInfoCallback );
}

function handleUserInfoCallback( err, user ) {
    // Call handler for logging in user (display specialized stories etc.)
    handleXIDLogin( user || null );

    // Save user info for future reference
    doStoreUser( user );
}

export {
    doLoginWithXID,
    doSwitchUserXID,
    doLogoutFromXID,
    doGetUserInfoXID,
    onXIDLoaded,
    onXIDClick
};