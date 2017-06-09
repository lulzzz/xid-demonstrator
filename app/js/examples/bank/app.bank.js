import '../../polyfill';

import {applyBindings} from '../../lib/binder';
import {observable} from '../../lib/observer';

import {
    doLogoutFromXID,
    doInitXID,
    doLoginWithXID
} from './xid.bank';

import CONSTANTS from './constants.bank';
import DomHelper from './helpers.bank';

// ELEMENTS
const $navigation = document.querySelector( 'nav' ),
    $menuNavButton = document.querySelector( '#menu-button' ),
    $closeNavMenuButton = document.querySelector( '#close-menu-button' ),
    body = document.querySelector( 'body' ),
    $main = document.querySelector( 'main' ),
    $loginPage = document.querySelector( 'section#login-page' ),
    $overviewPage = document.querySelector( 'section#overview-page' ),
    $contactPage = document.querySelector( 'section#contact-page' );

var currentPageName = null;

const userVm = observable( {
    isLoggedIn: false
} );

// FUNCTIONS

function getPageNameFromHash() {
    return ((window.location.hash || '').match( /#(\w+)/i ) || [null, getDefaultPageName()])[1];
}

function getUrlParameter( name, def ) {
    const value = ((new RegExp( name + '=' + '(.+?)(&|$)' )).exec( document.location.search ) || [null, def !== undefined ? def : null])[1];
    if ( value ) {
        return decodeURI( value );
    }
    return null;
}

function getDefaultPageName() {
    return userVm.isLoggedIn ? CONSTANTS.PAGE_NAME_OVERVIEW : CONSTANTS.PAGE_NAME_MAIN;
}

function onOpenedPage( pageName ) {
    let inlineElement = document.querySelector( '#authenticate-client' );
    inlineElement.style.display = 'none';

    switch ( pageName ) {
        case CONSTANTS.PAGE_NAME_LOGIN:
            if ( userVm.isLoggedIn ) {
                doRedirectToPage( getDefaultPageName() );
            }
            else {
                doLoginWithXID();
            }
            break;
        case CONSTANTS.PAGE_NAME_LOGOUT:
            doSetLoggedIn( false );
            doLogoutFromXID();
            // window.location.href = 'vesterfjell/';
            // document.location.reload();
            doRedirectToPage( getDefaultPageName() );
            break;
        case CONSTANTS.PAGE_NAME_OVERVIEW:
            if ( !userVm.isLoggedIn ) {
                doRedirectToPage( getDefaultPageName() );
            }
            break;
    }

}

function onXIDLoaded() {
    doInitXID();

    if ( currentPageName === CONSTANTS.PAGE_NAME_LOGIN && !userVm.isLoggedIn ) {
        doLoginWithXID();
    }
}

function doOpenPage( pageName ) {
    console.log( 'doOpenpage', pageName );
    if ( currentPageName === pageName ) {
        return;
    }

    let $pages = document.querySelectorAll( 'section[data-page-id]' ),
        $pageToActivate = document.querySelector( 'section[data-page-id=' + pageName + ']' );

    // set active page to default page if given page does not exist in DOM
    if ( !$pageToActivate ) {
        $pageToActivate = document.querySelector( 'section[data-page-id=' + getDefaultPageName() + ']' );
    }

    // remove active page classes from pages, add active page class to active page
    DomHelper.removeClassAll( $pages, CONSTANTS.CLASS_ACTIVE_PAGE );
    $pageToActivate.classList.add( CONSTANTS.CLASS_ACTIVE_PAGE );

    // set current page name
    currentPageName = $pageToActivate.getAttribute( 'data-page-id' );

    // activate navigation link
    let $navLinks = document.querySelectorAll( 'nav .link' ),
        $navLinkToActive = document.querySelector( 'nav .link[data-page=' + currentPageName + ']' );

    DomHelper.removeClassAll( $navLinks, CONSTANTS.CLASS_ACTIVE_NAV_LINK );

    if ( $navLinkToActive ) {
        $navLinkToActive.classList.add( CONSTANTS.CLASS_ACTIVE_NAV_LINK );
    }

    onOpenedPage( currentPageName );
}

function doRedirectToPage( pageName ) {
    window.history.replaceState( undefined, undefined, '#' + pageName );
    doOpenPage( pageName );
}

function doSetLoggedIn( isLoggedIn ) {
    userVm.isLoggedIn = isLoggedIn;
}

function doToggleMenu( isOpen ) {
    if ( isOpen ) {
        $navigation.classList.add( 'menu-is-open' );
    }
    else {
        $navigation.classList.remove( 'menu-is-open' );
    }
}

applyBindings( document.body, {
    user: userVm
} );

function doInit() {
    document.querySelector( '.main' ).style.display = 'none';

    // init page links
    const $pageLinks = document.querySelectorAll( '[data-page]' );
    DomHelper.bindAll( $pageLinks, 'click', function ( navItem ) {
        window.location.hash = navItem.getAttribute( 'data-page' ) || '';
        doToggleMenu( false );
    } );

    // init nav menu button
    $menuNavButton.onclick = doToggleMenu.bind( null, true );
    $closeNavMenuButton.onclick = doToggleMenu.bind( null, false );

    // handle hash change
    window.addEventListener( 'hashchange', function () {
        doOpenPage( getPageNameFromHash() );
    } );

    // xid loaded
    document.body.addEventListener( 'xid-loaded', onXIDLoaded, false );

    // login page
    document.querySelector( '#start-login-button' ).addEventListener( 'click', doLoginWithXID );

    // PAGES
    if ( getUrlParameter( 'signedin' ) ) {
        doSetLoggedIn( true );
    }

    document.body.classList.add( 'active' );
    doOpenPage( getPageNameFromHash() );
}

export {
    doInit,
    doSetLoggedIn,
    doRedirectToPage
};