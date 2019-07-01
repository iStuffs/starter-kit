const args = require('yargs').argv;
const gulp = require('gulp');
const named = require('vinyl-named');
const plugins = require('gulp-load-plugins');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const webpackConfig = require('./webpack.config');

/* Plugins */
// { autoprefixer, cleanCss, htmlmin, if, imagemin, notify, plumber, sass, sassGlob, uglify, zip }
const $ = plugins();

/* Configuration */
const {
    ERROR,
    JS,
    PATH,
} = require('./config.json');

const production = !!args.production;

function js() {
    return gulp
        .src(PATH.src + JS.entries, { sourcemaps: !production })
        .pipe(named())
        .pipe($.plumber({ errorHandler: $.notify.onError(ERROR) }))
        .pipe(webpackStream(webpackConfig, webpack))
        .pipe($.if(production, $.uglify()))
        .pipe(gulp.dest(PATH.dest + JS.dest, { sourcemaps: '.' }));
}

module.exports = js;
