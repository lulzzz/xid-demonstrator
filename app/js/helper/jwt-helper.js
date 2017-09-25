import UtilHelper from './util-helper';

export default class JWTHelper {
    static parse( token ) {
        if ( token ) {
            const part = token.split( '.' )[1];
            const decodedPart = JWTHelper.base64Decode( part );
            try {
                return UtilHelper.parseJSON( decodedPart ) || {};
            } catch( e ) {
                console.error( 'Cannot parse: ' + decodedPart );
                console.trace( e );
            }
        } else {
            return null;
        }
    }

    static base64Decode( str ) {
        // Going backwards: from bytestream, to percent-encoding, to original string.
        return decodeURIComponent( atob( str ).split( '' ).map( function ( c ) {
            return '%' + ( '00' + c.charCodeAt( 0 ).toString( 16 ) ).slice( -2 );
        } ).join( '' ) );
    }
}