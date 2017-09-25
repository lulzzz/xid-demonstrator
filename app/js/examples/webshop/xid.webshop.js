import ToastHelper from '../../helper/toast-helper';
import UtilHelper from '../../helper/util-helper';

import {
    doLoginUser,
    createUserFromXID,
    doScrollToUser
} from './app.webshop';

const toastContainerElement = document.querySelector( '.toast-wrapper' );

function onXIDLoaded() {
    if ( !window.XID ) {
        return console.warn( 'xID not loaded yet' );
    }

    window.XID.doInit( {
        client_id: 'xIDStore',
        client_type: 'XID',
        scope: 'openid standard_bankid email phone address',
        unsolicited: false,
        forceClientPrompt: false,
        redirect_uri: '{data_xidOauthRedirectUri}',
        oauth_url: '{data_xidOauthEndpoint}',
        token_endpoint: '{data_xidOauthTokenUrl}',
        userinfo_endpoint: '{data_xidOauthUserInfoUrl}'
    } );
}

function doLogoutFromXID() {
    window.XID.doLogout();
    doLoginUser( null );
    ToastHelper.showToast( toastContainerElement, 'Logget ut bruker' );
}

function doSwitchUserXID() {
    doLogoutFromXID();
    // FIXME Removes xID Cookie but should not be able to.
    window.XID.doReset();
    doLoginWithXID();
}

function doLoginWithXID( config = {} ) {

    window.XID.doConnect( {
        callback: ( err ) => {
            console.log( 'doLoginWithXID', err );

            if ( err ) {
                console.error( 'doLoginWithXID', err );
                if ( 'error' in err && err.error !== 'CANCELLED' ) {
                    ToastHelper.showToast( toastContainerElement, 'Noe galt skjedde, prøv igjen senere' );
                }
            }
            else {
                window.XID.doGetUserInfo( ( err, user ) => {
                    if ( err ) {
                        console.error( 'doLoginWithXID', err );
                        ToastHelper.showToast( toastContainerElement, 'Noe galt skjedde, prøv igjen senere' );
                    } else if ( user ) {
                        doLoginUser( createUserFromXID( user ) );
                        doScrollToUser();
                    }
                } );
            }
        },
        config: config,
        applicationName: 'nettbutikk.no'
    } );

}

export {
    doLoginWithXID,
    doSwitchUserXID,
    doLogoutFromXID,
    onXIDLoaded
};