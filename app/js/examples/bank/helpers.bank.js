export default class DomHelper {
    static nodeListToArray( nodeList ) {
        return Array.prototype.slice.call( nodeList );
    }

    static bindAll( $elements, event, handler ) {
        this.nodeListToArray( $elements ).forEach( function ( $element ) {
            $element.addEventListener( event, handler.bind( null, $element ) );
        } );
    }

    static addClassAll( $elements, className ) {
        this.nodeListToArray( $elements ).forEach( function ( $element ) {
            $element.classList.add( className );
        } );
    }

    static removeClassAll( $elements, className ) {
        this.nodeListToArray( $elements ).forEach( function ( $element ) {
            $element.classList.remove( className );
        } );
    }

    static setAttributeAll( $elements, attribute, value ) {
        this.nodeListToArray( $elements ).forEach( function ( $element ) {
            $element.setAttribute( attribute, value );
        } );
    }

    static removeAttributeAll( $elements, attribute ) {
        this.nodeListToArray( $elements ).forEach( function ( $element ) {
            $element.removeAttribute( attribute );
        } );
    }
}
