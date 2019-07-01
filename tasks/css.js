const { src, dest } = require('gulp');
const eyeglass = require('eyeglass');
const plugins = require('gulp-load-plugins');
const production = require('./helpers/mode');

/* Plugins */
const $ = plugins();

/* Configuration */
const {
    CSS,
    ERROR,
    PATH,
} = require('./config.json');

/* CSS */
function css() {
    return src(PATH.src + CSS.src, { sourcemaps: production })
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
        .pipe(dest(PATH.dest + CSS.dest, { sourcemaps: production }));
}

module.exports = css;
