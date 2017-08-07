const PATH = require( 'upath' );

const gulp = require( 'gulp' );
const gutil = require( 'gulp-util' );

const webpack = require( 'webpack' );

const ROOT = '../../';
const SRC_FOLDER = 'app/js/';
const DEV_OUTPUT_FOLDER = 'app/public/';

const WEBPACK_CONFIG = {
    entry: {
        'js/bid-xid_store': PATH.resolve( __dirname, ROOT, SRC_FOLDER, 'bid-xid_store.js' ),
        'js/bid-xid_news': PATH.resolve( __dirname, ROOT, SRC_FOLDER, 'bid-xid_news.js' ),
        'js/bid-xid_bank': PATH.resolve( __dirname, ROOT, SRC_FOLDER, 'bid-xid_bank.js' ),
    },
    output: {
        filename: '[name].bundle.js',
        path: DEV_OUTPUT_FOLDER
    },
    plugins: [
        new webpack.IgnorePlugin(/vertx/),
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015'],
                    plugins: ['transform-object-assign']
                }
            }
        ]
    }
};

// const compiler = webpack( require( WEBPACK_CONFIG ) );
const compiler = webpack( WEBPACK_CONFIG );

const printReport = function ( stats ) {
    gutil.log( '[webpack]', stats.toString( {
        modules: false,
        errorDetails: false,
        timings: false,
        cached: false,
        colors: true
    } ) );
};

gulp.task( 'build:js', function ( callback ) {
    compiler.run( function ( err, stats ) {
        if ( err ) {
            gutil.log( 'error', new gutil.PluginError( '[webpack]', err ) );
        }

        printReport( stats );
        callback();
    } );
} );

gulp.task( 'build:js:watch', function ( callback ) {
    compiler.watch( {
        aggregateTimeout: 300
    }, function ( err, stats ) {
        if ( err ) {
            gutil.log( 'error', new gutil.PluginError( '[webpack]', err ) );
        }

        printReport( stats );
    } );

    callback();
} );