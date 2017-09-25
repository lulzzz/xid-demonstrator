import CONSTANTS from './constants.news';

/**
 * Set logged in user data in temporary session storage.
 *
 * @param user
 */
function setLoggedInUser( user ) {
    if ( user ) {
        window.sessionStorage.setItem( CONSTANTS.STORAGE_KEY_LOGGED_IN_USER, JSON.stringify( user ) );
    }
    else {
        window.sessionStorage.removeItem( CONSTANTS.STORAGE_KEY_LOGGED_IN_USER );
    }
}

/**
 * Fetch logged in user data from temporary session storage.
 *
 * @returns {BIDXidConnect.UserInfo|null}
 */
function getLoggedInUser() {
    try {
        return JSON.parse( window.sessionStorage.getItem( CONSTANTS.STORAGE_KEY_LOGGED_IN_USER ) ) || null;
    }
    catch ( e ) {
        return null;
    }
}

/**
 * Store user data in long-term storage mocking persistant storage such as a database.
 * The user data stores the user by the `sub` identifier in the user object.
 * @param user
 */
function doStoreUser( user ) {
    if ( user ) {
        let users = JSON.parse( window.localStorage.getItem( CONSTANTS.STORAGE_KEY_USERS ) ) || null;
        if ( !users ) {
            users = {};
        }
        users[user.sub] = user;
        window.localStorage.setItem( CONSTANTS.STORAGE_KEY_USERS, JSON.stringify( users ) );
    }
    else {
        window.localStorage.removeItem( CONSTANTS.STORAGE_KEY_USERS );
    }
}

/**
 * Return the stored user data by passing the `sub` ID from tokens.
 * @returns {BIDXidConnect.UserInfo|null}
 */
function getStoredUser( sub ) {
    try {
        return JSON.parse( window.localStorage.getItem( CONSTANTS.STORAGE_KEY_USERS ) )[sub] || null;
    }
    catch ( e ) {
        return null;
    }
}

/**
 * Returns true if stored user data exists.
 */
function isUserDataSet() {
    return window.localStorage.getItem( CONSTANTS.STORAGE_KEY_USERS ) !== null;
}

export {
    doStoreUser,
    getStoredUser,
    getLoggedInUser,
    setLoggedInUser,
    isUserDataSet,
};