import SelectorConstants from '../constants/selector.constants';

import DomHelper from '../helper/dom-helper';

export default class Popover {
    static get SELECTORS() {
        return {
            VISIBLE: `${SelectorConstants.BASE}--visible`,
            POPOVER: `.${SelectorConstants.BASE}__popover`,
            CLOSE: `.${SelectorConstants.BASE}__popover .${SelectorConstants.BASE}__popover__close`
        };
    }

    /**
     * @param {HTMLElement} popoverElement
     * @param {HTMLElement} popoverButtonElement
     * @param {Object} [options]
     * @param {Boolean} [options.allowClickInside]
     */
    constructor( popoverElement, popoverButtonElement, options = {} ) {
        this.options = options;
        this.popoverElement = popoverElement;
        this.popoverButtonElement = popoverButtonElement;

        // re-bind
        this.onGlobalEvent = this.onGlobalEvent.bind( this );
    }

    isVisible() {
        return this.popoverElement.classList.contains( Popover.SELECTORS.VISIBLE );
    }

    onGlobalEvent( event ) {
        let isCloseByMouse = event.type === 'click';
        const isCloseByKeyboard = event.which === 27; // ESC key

        if ( isCloseByMouse && this.options.allowClickInside ) {
            isCloseByMouse = !this.popoverElement.contains( event.target ) && this.popoverElement !== event.target;
        }

        if ( isCloseByMouse || isCloseByKeyboard ) {
            setTimeout( this.hidePopover.bind( this ), 1 );
        }
    }

    initPopover() {
        this.popoverButtonElement.addEventListener( 'click', this.togglePopover.bind( this ), false );
        const closeButtonElement = this.popoverElement.querySelector( `${Popover.SELECTORS.CLOSE} button` );

        if ( closeButtonElement ) {
            closeButtonElement.addEventListener( 'click', this.hidePopover.bind( this ), false );
        }
    }

    showPopover() {
        this.popoverButtonElement.classList.add( 'active' );

        DomHelper.addAnimationClass( this.popoverElement, Popover.SELECTORS.VISIBLE ).then( () => {
            document.querySelector( 'body' ).addEventListener( 'click', this.onGlobalEvent, false );
            document.querySelector( 'body' ).addEventListener( 'keyup', this.onGlobalEvent, false );
        } );
    }

    hidePopover() {
        document.querySelector( 'body' ).removeEventListener( 'click', this.onGlobalEvent );
        document.querySelector( 'body' ).removeEventListener( 'keyup', this.onGlobalEvent );

        this.popoverButtonElement.classList.remove( 'active' );
        DomHelper.removeAnimationClass( this.popoverElement, Popover.SELECTORS.VISIBLE );
    }

    togglePopover() {
        if ( this.isVisible() ) {
            this.hidePopover();
        }
        else {
            this.showPopover();
        }
    }
}