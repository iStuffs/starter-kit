/* Imports */
const args = require('yargs').argv;
const eyeglass = require('eyeglass');
const gulp = require('gulp');
const plugins = require('gulp-load-plugins');
const rm = require('rimraf');
const sassdoc = require('sassdoc');

/* Plugins */
// { autoprefixer, cleanCss, if, notify, plumber, sass, sassGlob, sourcemaps, uglify, zip }
const $ = plugins();

/* Configuration */
const {
    COMPATIBILITY, CSS, DOC, ERROR, PATH,
} = require('./config.json');

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

// Clean - Clean destination directory
function clean(done) {
    rm(PATH.dest, done);
}

// Doc - Sass Documentation
function doc() {
    return gulp.src(PATH.src + CSS.src)
        .pipe(sassdoc(DOC.sassDocOptions));
}

/* Build */
gulp.task('build', gulp.series(clean, css));

/* Doc */
gulp.task('doc', gulp.series(doc));

/* Watching */
gulp.task(
    'watch',
    gulp.series('build', () => {
        // css
        gulp.watch(PATH.src + CSS.src, gulp.series(css));
    }),
);

/* Default task */
gulp.task('default', production ? gulp.series('build') : gulp.series('watch'));
