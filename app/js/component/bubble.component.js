import SELECTOR_CONSTANTS from '../constants/selector.constants';
import DomHelper from '../helper/dom-helper';

export default class Bubble {
    constructor( bubbleElement ) {
        this.bubbleElement = bubbleElement;

        // re-bind
        this.onGlobalEvent = this.onGlobalEvent.bind( this );
    }

    onGlobalEvent( event ) {
        this.hideBubble();
    }

    showBubble() {
        DomHelper.addAnimationClass( this.bubbleElement, `${SELECTOR_CONSTANTS.BASE}--visible` ).then( () => {
            document.querySelector( "body" ).addEventListener( "click", this.onGlobalEvent, false );
            document.querySelector( "body" ).addEventListener( "keydown", this.onGlobalEvent, false );
        } );
    }

    hideBubble() {
        document.querySelector( "body" ).removeEventListener( "click", this.onGlobalEvent );
        document.querySelector( "body" ).removeEventListener( "keydown", this.onGlobalEvent );

        DomHelper.removeAnimationClass( this.bubbleElement, `${SELECTOR_CONSTANTS.BASE}--visible` );
    }
}