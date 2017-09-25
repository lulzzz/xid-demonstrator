const path = require( 'upath' );
const url = require( 'url' );
const queryString = require( 'query-string' );
const fs = require( 'fs' );

const serverCommon = require( '../common/server.common' );
const injectHtmlCommon = require( '../common/inject-html.common.js' );

const ROOT = '../../';
const PUBLIC_FOLDER = path.resolve( __dirname, ROOT, 'app', 'public' );
const IGNORE_INJECT_FILES_REGEXP = /^(\/index.html)/i;

function prepareMiddleware( req, res, next ) {
    const urlParsed = url.parse( req.url );
    let pathname = path.normalize( urlParsed.pathname )

    if ( /\/$/.test( pathname ) ) {
        pathname += 'index.html';
    }

    if ( /(\.js|\.html)$/.test( pathname ) ) {
        const urlSearchObj = queryString.parse( urlParsed.search );
        const DEFAULT_DATA = serverCommon.getDefaultDataJson();

        const data = Object.assign( {}, DEFAULT_DATA, (() => {
            try {
                return JSON.parse( urlSearchObj['data'] );
            }
            catch ( e ) {
                return null;
            }
        })() );

        const locale = DEFAULT_DATA['acceptedLocales'].indexOf( urlSearchObj['locale'] ) > -1 ? urlSearchObj['locale'] : DEFAULT_DATA['bankidLocale'];

        // overwrite data bankid locale
        data['bankidLocale'] = locale;

        prepareFile( { url: req.url, pathname, data, locale } )
            .then( prepareInject )
            .then( prepareTemplate )
            .then( prepareData )
            .then( ( { result } ) => res.end( result ) )
            .catch( console.error );
    }
    else {
        next();
    }
}

function prepareFile( { url, pathname, data, locale } ) {
    return new Promise( ( fulfill ) => {
        const filePath = path.resolve( PUBLIC_FOLDER, pathname.replace( /^\//, '' ) );

        fs.readFile( filePath, 'UTF-8', ( err, result ) => {
            result = ( result || '' );

            fulfill( { url, pathname, result, data, locale } );
        } );
    } );
}

function prepareLanguage( { url, pathname, result, data, locale } ) {
    return new Promise( ( fulfill ) => {
        result = result.replace( /{lang_context}/g, JSON.stringify( language ) );

        if ( !IGNORE_INJECT_FILES_REGEXP.test( pathname ) ) {
            Object.keys( language ).forEach( key => {
                const value = locale === 'zz' ? key : language[key][locale];

                result = result.replace( new RegExp( `{lang_${key}}`, 'g' ), value );
            } );
        }

        fulfill( { url, pathname, result, data, locale } );
    } );
}

function prepareData( { url, pathname, result, data, locale } ) {
    return new Promise( ( fulfill ) => {
        // replace all of data
        result = result.replace( /{data_context}/g, JSON.stringify( data ) );

        // replace data keys
        if ( !IGNORE_INJECT_FILES_REGEXP.test( pathname ) ) {
            Object.keys( data ).forEach( key => {
                result = result.replace( new RegExp( `{data_${key}}`, 'g' ), typeof data[key] === 'object' ? JSON.stringify( data[key] ) : data[key] );
            } );
        }

        // replace 'bidHelperUri' and 'xidConnectJs'
        if ( 'bidHelperUri' in data ) {
            result = result.replace( /{bidHelperUri}/, data['bidHelperUri'] );
        }
        if ( 'xidConnectJs' in data ) {
            result = result.replace( /{xidConnectJs}/, data['xidConnectJs'] );
        }

        fulfill( { url, pathname, result, data, locale } );
    } );
}

function prepareTemplate( { url, pathname, result, data, locale } ) {
    return new Promise( ( fulfill ) => {
        if ( /\.html$/.test( pathname ) ) {
            // find templates
            const templateRegExp = /<!--template:(\w+)([\s\S]*?)\/template-->/mg;
            let templateMatch;
            let templateGroups = {};

            while ( ( templateMatch = templateRegExp.exec( result ) ) !== null ) {
                templateGroups[templateMatch[1]] = templateMatch[2];
            }

            // find template containers
            const templateContainerRegExp = /<!--template-container:(\w+)\|(\w+)-->/g;
            let templateContainerMatch;
            let templateContainerGroups = {};

            while ( ( templateContainerMatch = templateContainerRegExp.exec( result ) ) !== null ) {
                let template = templateGroups[templateContainerMatch[2]];
                let templateData = data[templateContainerMatch[1]];

                if ( template && templateData ) {
                    templateData = Array.isArray( templateData ) ? templateData : [templateData];

                    templateContainerGroups[`${templateContainerMatch[1]}|${templateContainerMatch[2]}`] = templateData.map( dataObj => {
                        let templateClone = template;
                        Object.keys( dataObj ).forEach( key => templateClone = templateClone.replace( new RegExp( `{template_data_${key}}`, 'g' ), dataObj[key] ) );
                        return templateClone;
                    } ).join( '\n' );
                }
            }

            // replace template containers with template data to result
            Object.keys( templateContainerGroups ).forEach( key => result = result.replace( `<!--template-container:${key}-->`, templateContainerGroups[key] ) );
        }

        fulfill( { url, pathname, result, data, locale } );
    } );
}

function prepareInject( { url, pathname, result, data, locale } ) {
    return new Promise( ( fulfill ) => {
        if ( /\.html$/.test( pathname ) ) {
            result = injectHtmlCommon( result, path.join( PUBLIC_FOLDER, path.dirname( pathname ) ) );
        }

        fulfill( { url, pathname, result, data, locale } );
    } );
}

module.exports = prepareMiddleware;