/**
 * @typedef {Object} User
 * @property {String} name
 * @property {String} email
 * @property {String} phone
 * @property {String} address
 * @property {String} post
 */

import '../../polyfill';

import {
    observable,
    observe
} from '../../lib/observer';
import { applyBindings } from '../../lib/binder';

import DomHelper from '../../helper/dom-helper';
import ToastHelper from '../../helper/toast-helper';

import ProductStore from '../../store/product.store';

import DialogComponent from '../../component/dialog.component';
import PopoverComponent from '../../component/popover.component';

import UtilHelper from '../../helper/util-helper.js';

import CONSTANTS from './constants.webshop';

import {
    onXIDLoaded,
    doSwitchUserXID,
    doLogoutFromXID
} from './xid.webshop';

const mainElement = document.querySelector( '.main' );
const productsPageElement = document.querySelector( '.page[data-page=products]' );
const toastContainerElement = document.querySelector( '.toast-wrapper' );

const finishPayDialog = new DialogComponent( document.querySelector( `${DialogComponent.SELECTORS.DIALOG}[data-dialog=finish-pay]` ) );
const userPopover = new PopoverComponent( document.querySelector( '[data-popover=user]' ), document.querySelector( 'button[data-button=user]' ) );

const productList = observable( [] );

ProductStore.productList.forEach( product => productList.push( product ) );

let activePageElement;

const shoppingCart = observable( {
    amount: 0,
    cost: 0,
    costPretty: getPrettyNumber( 0 ),
    isEmpty: true
} );

const userFormVm = observable( {
    isLoginError: false,
    email: '',
    password: ''
} );

const userVm = observable( {
    isLoggedIn: false,
    name: '',
    email: '',
    phone: '',
    address: '',
    post: '',
} );

/**
 * @param {BIDXidConnect.UserInfo} userInfo
 * @returns {User}
 */
function createUserFromXID( userInfo ) {
    function getAddress() {
        return userInfo.address || {};
    }

    let postal_address = '';
    if ( getAddress().postal_code && getAddress().locality ) {
        postal_address = getAddress().postal_code + ' ' + getAddress().locality;
    }

    return {
        name: userInfo.name,
        email: userInfo.email || '',
        phone: userInfo.phone_number || '',
        address: getAddress().street_address || '',
        post: postal_address
    };
}

/**
 * @returns {User}
 */
function createUserFromForm() {
    return {
        name: CONSTANTS.USER_NAME,
        email: CONSTANTS.USER_EMAIL,
        phone: '90123456',
        address: 'Hjemmeveien 115',
        post: '0100 Oslo'
    };
}

/**
 *
 * @returns {User|null}
 */
function getLoggedInUser() {
    try {
        return JSON.parse( window.sessionStorage.getItem( CONSTANTS.KEY_STORAGE_USER ) ) || null;
    }
    catch ( e ) {
        return null;
    }
}

function getPrettyNumber( num ) {
    const p = String( Math.round( num ) );
    return p.split( '' )
        .reverse()
        .reduce( ( acc, num, i ) => num == '-' ? acc : num + ( i && !( i % 3 ) ? ' ' : '' ) + acc, '' ) + ',-';
}

function onUserFormChange( value, key ) {
    if ( key === 'email' || key === 'password' ) {
        userFormVm.isLoginError = false;
    }
}

function doShowPage( pageElement ) {
    Array.from( document.querySelector( '.page[data-page]' ) ).forEach( element => element.classList.remove( 'active' ) );

    mainElement.scrollTop = 0;

    pageElement.classList.add( 'active' );
    activePageElement = pageElement;
}

function doAddToCart( product ) {
    product.amount++;
}

function doRemoveFromCart( product ) {
    product.amount--;
}

function doEmptyCart() {
    productList.forEach( product => product.amount = 0 );
}

function doLoginWithForm() {
    if ( CONSTANTS.USER_EMAIL.toLowerCase() === ( userFormVm.email || '' ).toLowerCase() && CONSTANTS.USER_PASSWORD.toLowerCase() === ( userFormVm.password || '' ).toLowerCase() ) {
        userFormVm.isLoginError = false;
        doLoginUser( createUserFromForm() );
        ToastHelper.showToast( toastContainerElement, 'Bruker logget in' );
    }
    else {
        userFormVm.isLoginError = true;
        ToastHelper.showToast( toastContainerElement, 'Brukeren finnes ikke' );
    }
}

function doRegisterWithForm() {
    ToastHelper.showToast( toastContainerElement, 'Kunne ikke opprette bruker nå' );
}

function doFinishPay() {
    finishPayDialog.showDialog();
}

/**
 * @param {User|null} user
 */
function doLoginUser( user ) {
    if ( user ) {
        userVm.isLoggedIn = true;
        window.sessionStorage.setItem( CONSTANTS.KEY_STORAGE_USER, JSON.stringify( user ) );
        doPopulateUser( user );
    }
    else {
        userVm.isLoggedIn = false;
        window.sessionStorage.removeItem( CONSTANTS.KEY_STORAGE_USER );
    }
}

/**
 * @param {User} user
 */
function doPopulateUser( user ) {
    userVm.name = user.name;
    userVm.email = user.email;
    userVm.phone = user.phone;
    userVm.address = user.address;
    userVm.post = user.post;
}

function doScrollToUser() {
    DomHelper.scrollIntoView( activePageElement.querySelector( '.section[data-section=user]' ), { alignToTop: true } );
}

function onXIDConnect( event ) {
    console.log( 'onXIDConnect', event );
}

function onXIDUser( event ) {
    console.log( 'onXIDUser', event );
    const data = event.detail;

    if ( data.err ) {
        console.error( 'onXIDUser', data.err );
        if ( 'error' in data.err && data.err.error !== 'CANCELLED' ) {
            ToastHelper.showToast( toastContainerElement, 'Noe galt skjedde, prøv igjen senere' );
        }
    }
    else if ( data.user ) {
        doLoginUser( createUserFromXID( data.user ) );
        doScrollToUser();
    }
}

function doInit() {
    document.querySelector( 'button[data-button=cart]' ).addEventListener( 'click', () => {
        DomHelper.scrollIntoView( activePageElement.querySelector( '.section[data-section=cart]' ), { alignToTop: true } );
    }, false );
    document.querySelector( 'button[data-button=login]' ).addEventListener( 'click', doScrollToUser, false );
    document.querySelector( 'button[data-button=logout]' ).addEventListener( 'click', doLogoutFromXID, false );
    document.querySelector( 'button[data-button=to-payment]' ).addEventListener( 'click', doScrollToUser, false );
    document.querySelector( 'button[data-button=switch-user]' ).addEventListener( 'click', doSwitchUserXID, false );

    doLoginUser( getLoggedInUser() );
    doShowPage( productsPageElement );

    finishPayDialog.initDialog();
    userPopover.initPopover();

    Promise
        .all( productList.map( product => DomHelper.loadImagePromise( product.image ) ) )
        .then( () => {
            document.body.classList.add( 'active' );
        } )
        .catch( err => {
            console.error( err, err.stack );
        } );

    document.body.addEventListener( 'xid-loaded', onXIDLoaded, false );
    document.body.addEventListener( 'xid-connect', onXIDConnect, false );
    document.body.addEventListener( 'xid-user', onXIDUser, false );

    window.productList = productList;
    window.shoppingCart = shoppingCart;
}

observe( productList, () => {
    shoppingCart.amount = productList.map( product => product.amount ).reduce( ( total, amount ) => total + amount, 0 );
    shoppingCart.cost = productList.map( product => product.amount * product.cost ).reduce( ( total, amount ) => total + amount, 0 );
    shoppingCart.costPretty = getPrettyNumber( shoppingCart.cost );
    shoppingCart.isEmpty = shoppingCart.amount === 0;
} );

observe( userFormVm, onUserFormChange );

applyBindings( document.querySelector( 'body' ), {
    productList,
    shoppingCart,
    userForm: userFormVm,
    user: userVm,
    onAddToCartClick: doAddToCart,
    onRemoveFromCartClick: doRemoveFromCart,
    onEmptyCartClick: doEmptyCart,
    onLoginClick: doLoginWithForm,
    onRegisterClick: doRegisterWithForm,
    onFinishPayClick: doFinishPay,
    getPrettyCost: ( product ) => {
        return getPrettyNumber( product.cost );
    },
    getPrettyTotalCost: ( product ) => {
        return getPrettyNumber( product.cost * product.amount );
    },
} );

export {
    doInit,
    doLoginUser,
    createUserFromXID,
    doScrollToUser
};