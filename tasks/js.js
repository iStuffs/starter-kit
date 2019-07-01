const { src, dest } = require('gulp');
const named = require('vinyl-named');
const plugins = require('gulp-load-plugins');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');

const production = require('./helpers/mode');
const webpackConfig = require('./webpack.config');

/* Plugins */
const $ = plugins();

/* Configuration */
const {
    ERROR,
    JS,
    PATH,
} = require('./config.json');

function js() {
    return src(PATH.src + JS.entries, { sourcemaps: production })
        .pipe(named())
        .pipe($.plumber({ errorHandler: $.notify.onError(ERROR) }))
        .pipe(webpackStream(webpackConfig, webpack))
        .pipe($.if(production, $.uglify()))
        .pipe(dest(PATH.dest + JS.dest, { sourcemaps: '.' }));
}

module.exports = js;
