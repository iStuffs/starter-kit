const args = require('yargs').argv;
const gulp = require('gulp');
const panini = require('panini');
const plugins = require('gulp-load-plugins');

/* Plugins */
// { autoprefixer, cleanCss, htmlmin, if, imagemin, notify, plumber, sass, sassGlob, sourcemaps, uglify, zip }
const $ = plugins();

/* Configuration */
const {
    ERROR,
    HTML,
    PATH,
} = require('./config.json');

const production = !!args.production;


/* HTML */
function html() {
    return gulp
        .src(PATH.src + HTML.entries)
        .pipe($.plumber({ errorHandler: $.notify.onError(ERROR) }))
        .pipe(panini(HTML.paniniOptions))
        .pipe($.if(production, $.htmlmin({ collapseWhitespace: true })))
        .pipe(gulp.dest(PATH.dest + HTML.dest));
}

module.exports = html;
