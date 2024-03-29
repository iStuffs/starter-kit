const { src, dest } = require('gulp');
const eyeglass = require('eyeglass');
const plugins = require('gulp-load-plugins');

const production = require('./helper/mode');

/* Configuration */
const {
    COMPATIBILITY,
    CSS,
    ERROR,
    PATH,
} = require('./config.json');

/* Plugins */
// { autoprefixer, cleanCss, htmlmin, if, imagemin, notify, plumber, sass, sassGlob, uglify, zip }
const $ = plugins();

/* CSS */
function css() {
    return src(PATH.src + CSS.src, { sourcemaps: !production })
        .pipe(
            $.plumber({
                errorHandler: $.notify.onError(ERROR),
            }),
        )
        .pipe($.sassGlob())
        .pipe($.sass(eyeglass()).on('error', $.sass.logError))
        .pipe(
            $.autoprefixer({
                cascade: false,
            }),
        )
        .pipe($.if(production, $.cleanCss({ compatibility: 'ie11' })))
        .pipe(dest(PATH.dest + CSS.dest, { sourcemaps: '.' }));
}

module.exports = css;
