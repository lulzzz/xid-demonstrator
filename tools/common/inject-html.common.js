const path = require( 'upath' );
const fs = require( 'fs' );

module.exports = ( result, root ) => {
    const injectRegExp = /<!--inject:(.*?)(:(.*?))?-->/g;
    let injectMatch;

    while ( (injectMatch = injectRegExp.exec( result )) !== null ) {
        let injectFileContents = fs.readFileSync( path.resolve( root, injectMatch[1] ), 'UTF-8' );

        // only inject body if file is html
        if ( /.html$/.test( injectMatch[1] ) ) {
            injectFileContents = (injectFileContents.match( /<body.*?>([\s\S]*)<\/body>/ ) || [, injectFileContents])[1];
        }

        // replace dynamic values if given
        if ( injectMatch[3] ) {
            const replaceData = (() => {
                    try {
                        return JSON.parse( injectMatch[3] );
                    }
                    catch ( e ) {
                        return null;
                    }
                })() || {};

            Object.keys( replaceData ).forEach( ( key ) => {
                injectFileContents = injectFileContents.replace( new RegExp( `{${key}}`, 'g' ), `{${replaceData[key]}}` );
            } );
        }

        result = result.replace( injectMatch[0], injectFileContents );
    }

    return result;
};