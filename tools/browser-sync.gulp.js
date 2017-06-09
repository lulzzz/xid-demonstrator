const PATH = require( 'path' );

const gulp = require( 'gulp' );
const browserSync = require( 'browser-sync' );

const ROOT = '../';
const PUBLIC_FOLDER = PATH.resolve( __dirname, ROOT, 'app', 'public' );

const packageJson = require( PATH.resolve( __dirname, ROOT, 'package.json' ) );

gulp.task( 'browser-sync', function () {
    browserSync.init( {
        browser: [],
        notify: false,
        online: false,
        logConnections: true,
        port: packageJson.portBrowserSync,
        ui: {
            port: packageJson.portBrowserSyncUI
        },
        files: [
            `${PUBLIC_FOLDER}/**`,
            `!${PUBLIC_FOLDER}/**/*.css`,
            `!${PUBLIC_FOLDER}/**/*.css.map`,
        ],
        proxy: {
            target: `localhost:${packageJson.port}`
        },
        snippetOptions: {
            ignorePaths: '**/bid-xid_connect_button.html'
        }
    } );

    gulp.watch( `${PUBLIC_FOLDER}/**/*.css`, function () {
        gulp.src( `${PUBLIC_FOLDER}/**/*.css` )
            .pipe( browserSync.stream() );
    } );
} );