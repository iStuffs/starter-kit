const args = require('yargs').argv;
const eyeglass = require('eyeglass');
const gulp = require('gulp');
const plugins = require('gulp-load-plugins');

/* Configuration */
const {
    COMPATIBILITY,
    CSS,
    ERROR,
    PATH,
} = require('./config.json');

/* Plugins */
// { autoprefixer, cleanCss, htmlmin, if, imagemin, notify, plumber, sass, sassGlob, sourcemaps, uglify, zip }
const $ = plugins();

const production = !!args.production;


/* CSS */
function css() {
    return gulp
        .src(PATH.src + CSS.src)
        .pipe(
            $.plumber({
                errorHandler: $.notify.onError(ERROR),
            }),
        )
        .pipe($.if(!production, $.sourcemaps.init()))
        .pipe($.sassGlob())
        .pipe($.sass(eyeglass()).on('error', $.sass.logError))
        .pipe(
            $.autoprefixer({
                browsers: COMPATIBILITY,
                cascade: false,
            }),
        )
        .pipe($.if(production, $.cleanCss({ compatibility: 'ie11' })))
        .pipe($.if(!production, $.sourcemaps.write('.')))
        .pipe(gulp.dest(PATH.dest + CSS.dest));
}

module.exports = css;
