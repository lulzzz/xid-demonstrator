import SELECTOR_CONSTANTS from '../constants/selector.constants'

import Popover from '../components/popover.component';
import DomHelper from '../helper/dom-helper';

const BID_OAUTH_GLOBAL = window.BID_OAUTH_GLOBAL || {};

const menuPopoverElement = document.querySelector( SELECTOR_CONSTANTS.MENU_POPOVER );
const menuButtonElement = document.querySelector( SELECTOR_CONSTANTS.MENU_BUTTON );

const certificatePopoverElement = document.querySelector( SELECTOR_CONSTANTS.CERTIFICATE_POPOVER );
const certificateButtonElement = document.querySelector( SELECTOR_CONSTANTS.CERTIFICATE_BUTTON );

const mainElement = document.querySelector( SELECTOR_CONSTANTS.MAIN );

function handleCancel() {
    DomHelper.disableView( mainElement );

    if ( BID_OAUTH_GLOBAL.cancelUrl ) {
        DomHelper.submit( BID_OAUTH_GLOBAL.cancelUrl, {} );
    }
    else {
        alert( "Cancel" );
    }
}

new Popover( menuPopoverElement, menuButtonElement );
new Popover( certificatePopoverElement, certificateButtonElement, {
    allowClickInside: true
} );

document.querySelector( `${SELECTOR_CONSTANTS.MENU_POPOVER} button[data-button=cancel]` ).addEventListener( "click", handleCancel, false );

document.querySelector( SELECTOR_CONSTANTS.CONTENT_HEADER_HEADLINE ).focus();