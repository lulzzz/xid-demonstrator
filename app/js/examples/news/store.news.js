import CONSTANTS from './constants.news';

/**
 * @returns {BIDXidConnect.UserInfo|null}
 */
function getLoggedInUser() {
    try {
        return JSON.parse( window.sessionStorage.getItem( CONSTANTS.STORAGE_KEY_USER ) ) || null;
    }
    catch ( e ) {
        return null;
    }
}

function doStoreUser( user ) {
    if ( user ) {
        window.sessionStorage.setItem( CONSTANTS.STORAGE_KEY_USER, JSON.stringify( user ) );
    }
    else {
        window.sessionStorage.removeItem( CONSTANTS.STORAGE_KEY_USER );
    }
}

export {
    doStoreUser,
    getLoggedInUser
};