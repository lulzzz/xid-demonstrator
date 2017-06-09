process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const PATH = require( 'path' );

const ROOT = '../';
const PUBLIC_FOLDER = PATH.resolve( __dirname, ROOT, 'app', 'public' );
const DATA_FILE = PATH.resolve( __dirname, ROOT, 'config.json' );
const IGNORE_INJECT_FILES_REGEXP = /(index.html|bid-udd_viewer)/i;

const DEV_DATA_FILE = PATH.resolve( __dirname, ROOT, 'config.dev.json' );

const gulp = require( 'gulp' );
const url = require( 'url' );
const fs = require( 'fs' );
const formidable = require( 'formidable' );
const rp = require( 'request-promise' );
const queryString = require( 'query-string' );
const connect = require( 'gulp-connect' );

const packageJson = require( PATH.resolve( __dirname, ROOT, 'package.json' ) );
const form = new formidable.IncomingForm();

function getDefaultDataJson() {
    const defaultConfig = JSON.parse( fs.readFileSync( DATA_FILE, 'UTF-8' ) );
    const data = Object.assign( {}, defaultConfig, (() => {
        try {
            return JSON.parse( fs.readFileSync( DEV_DATA_FILE, 'UTF-8' ) );
        }
        catch ( e ) {
            return null;
        }
    })() );
    
    return data;
}

function oauthMiddleware( req, res, next ) {
    const urlParsed = url.parse( req.url );

    // OAuth token
    if ( urlParsed.path === '/oauth/token' ) {
        const DEFAULT_DATA = getDefaultDataJson();
        const client = (req.headers['referer'].match( /bid-xid_(.*?).html/ ) || [null, 'default'])[1];
        const clientSecret = DEFAULT_DATA['xidSecret'][client];

        if ( !clientSecret ) {
            res.statusCode = 400;
            res.end( JSON.stringify( {error: 'Unknown client, no client secret'} ) );
            return;
        }

        form.parse( req, function ( err, fields ) {
            const options = {
                method: 'POST',
                uri: DEFAULT_DATA['xidBackendOauthTokenUrl'],
                form: {
                    client_id: fields['client_id'],
                    client_secret: clientSecret,
                    grant_type: fields['grant_type'],
                    code: fields['code'],
                    redirect_uri: fields['redirect_uri']
                },
                json: true
            };

            rp( options )
                .then( function ( response ) {
                    console.log( 'token response', response );
                    res.end( JSON.stringify( response ) );
                } )
                .catch( function ( err ) {
                    console.log( 'token response error', err );
                    res.statusCode = err.statusCode;
                    res.end( JSON.stringify( err.error ) );
                } );
        } );
    }
    // OAuth user info
    else if ( urlParsed.path === '/oauth/userinfo' ) {
        const DEFAULT_DATA = getDefaultDataJson();
        const client = (req.headers['referer'].match( /bid-xid_(.*?).html/ ) || [null, null])[1];
        const clientSecret = DEFAULT_DATA['xidSecret'][client];

        if ( !clientSecret ) {
            res.statusCode = 400;
            res.end( JSON.stringify( {error: 'Unknown client, no client secret'} ) );
            return;
        }

        form.parse( req, function ( err, fields ) {
            const options = {
                uri: DEFAULT_DATA['xidBackendOauthUserInfoUrl'],
                headers: {
                    Authorization: `${fields['token_type']} ${fields['access_token']}`,
                },
                json: true
            };

            rp( options )
                .then( function ( response ) {
                    // FIXME: Sometimes the userinfo response includes errounous newlines
                    try {
                        response = JSON.parse(response.replace(/(\r\n|\n|\r)/gm, ''));
                    } catch (error) {
                        console.error ( 'userinfo response parsing failed, continuing' );
                    }

                    console.log( 'userinfo response', response );
                    res.end( JSON.stringify( response ) );
                } )
                .catch( function ( err ) {
                    console.error( 'userinfo response error', err );
                    res.statusCode = err.statusCode;
                    res.end( JSON.stringify( err.error ) );
                } );
        } );
    }
    else {
        next();
    }
}

function prepareMiddleware( req, res, next ) {
    const urlParsed = url.parse( req.url );
    const pathname = PATH.normalize( urlParsed.pathname );

    if ( /\.(js|html)$/.test( pathname ) ) {
        const urlSearchObj = queryString.parse( urlParsed.search );
        const DEFAULT_DATA = getDefaultDataJson();

        const data = Object.assign( {}, DEFAULT_DATA, (() => {
            try {
                return JSON.parse( urlSearchObj['data'] );
            }
            catch ( e ) {
                return null;
            }
        })() );

        prepareFile( {url: req.url, pathname, data} )
            .then( prepareData )
            .then( ( {result} ) => res.end( result ) )
            .catch( console.error );
    }
    else {
        next();
    }
}

function prepareFile( {url, pathname, data} ) {
    return new Promise( ( fulfill ) => {
        const filePath = PATH.resolve( PUBLIC_FOLDER, pathname.replace( /^\//, '' ) );

        fs.readFile( filePath, 'UTF-8', ( err, result ) => {
            result = (result || '');

            fulfill( {url, pathname, result, data} );
        } );
    } );
}

function prepareData( {url, pathname, result, data} ) {
    return new Promise( ( fulfill ) => {
        // replace all of data
        result = result.replace( /\{data_context\}/g, JSON.stringify( data ) );

        // replace data keys
        if ( !IGNORE_INJECT_FILES_REGEXP.test( pathname ) ) {
            Object.keys( data ).forEach( key => {
                result = result.replace( new RegExp( `{data_${key}}`, 'g' ), typeof data[key] === 'object' ? JSON.stringify( data[key] ) : data[key] );
            } );
        }

        if ('xidConnectCss' in data) {
            result = result.replace( /\{xidConnectCss\}/g, data['xidConnectCss'] );
        }

        if ('xidConnectJs' in data) {
            result = result.replace( /\{xidConnectJs\}/g, data['xidConnectJs'] );
        }

        fulfill( {url, pathname, result, data} );
    } );
}

gulp.task( 'server', () => {
    return connect.server( {
        port: packageJson.port,
        root: PUBLIC_FOLDER,
        middleware: () => {
            return [prepareMiddleware, oauthMiddleware];
        }
    } );
} );