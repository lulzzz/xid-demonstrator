process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const path = require( 'upath' );

const ROOT = '../';
const PUBLIC_FOLDER = path.resolve( __dirname, ROOT, 'app', 'public' );

const gulp = require( 'gulp' );
const connect = require( 'gulp-connect' );
const bodyParser = require( 'body-parser' );

const packageJson = require( path.resolve( __dirname, ROOT, 'package.json' ) );

const prepareMiddleware = require( './server/prepare.server-middleware' );
const oauthMiddleware = require( './server/oauth.server-middleware' );

gulp.task( 'server', () => {
    return connect.server( {
        port: packageJson.port,
        root: PUBLIC_FOLDER,
        middleware: () => {
            return [prepareMiddleware, oauthMiddleware, bodyParser.json()];
        }
    } );
} );