const fs = require( 'fs' );
const path = require( 'upath' );
const extend = require( 'extend' );
const packageJSON = require( '../../package.json' );

const ROOT = '../../';
const DATA_FILE = path.resolve( __dirname, ROOT, 'config.json' );
const DATA_CUSTOM_FILE = path.resolve( __dirname, ROOT, 'config.dev.json' );

const [major, minor] = ( packageJSON.version.match( /^(\d+)\.(\d+)/ ) || [null, '0', '0'] ).splice( 1 );
let version = `${major}.${minor}.0`;
let versionHash = '';


module.exports.getDefaultDataJson = function () {
    const defaultData = JSON.parse( fs.readFileSync( DATA_FILE, 'UTF-8' ) );

    try {
        fs.statSync( DATA_CUSTOM_FILE );
        extend( defaultData, JSON.parse( fs.readFileSync( DATA_CUSTOM_FILE, 'UTF-8' ) ) );
    }
    catch ( e ) {
        // ignore
    }

    // append version and version hash to data
    defaultData['version'] = version;
    defaultData['versionHash'] = versionHash;

    return defaultData;
};