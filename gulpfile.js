const gulp = require( 'gulp' );

const requireDir = require( 'require-dir' );

requireDir( './tools', {recurse: false} );
requireDir( './tools/build', {recurse: false} );

gulp.task( 'default', ['server'] );
gulp.task( 'build', ['build:js'] );
gulp.task( 'dev', ['build:js:watch', 'browser-sync', 'server'] );