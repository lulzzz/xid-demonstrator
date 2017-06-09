import DomHelper from './dom-helper';

export default class ToastHelper {
    static showToast( containerElement, message ) {
        const toastElement = document.createElement( 'div' );
        toastElement.classList.add( 'toast' );
        toastElement.innerText = message;

        containerElement.appendChild( toastElement );

        setTimeout( () => {
            ToastHelper.removeToast( toastElement );
        }, 5000 );
    }

    static removeToast( toastElement ) {
        if ( toastElement.parentNode ) {
            DomHelper.addAnimationClass( toastElement, 'remove' ).then( () => {
                toastElement.parentNode.removeChild( toastElement );
                toastElement.classList.remove( 'remove' );
            } );
        }
    }
}