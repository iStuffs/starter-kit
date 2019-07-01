const gulp = require('gulp');
const plugins = require('gulp-load-plugins');

/* Plugins */
// { autoprefixer, cleanCss, htmlmin, if, imagemin, notify, plumber, sass, sassGlob, sourcemaps, uglify, zip }
const $ = plugins();

/* Configuration */
const {
    IMAGES,
    PATH,
} = require('./config.json');

/* IMAGES */
function images() {
    return gulp
        .src(PATH.src + IMAGES.src)
        .pipe($.imagemin())
        .pipe(gulp.dest(PATH.dest + IMAGES.dest));
}

module.exports = images;
