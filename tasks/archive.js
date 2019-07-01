const gulp = require('gulp');
const plugins = require('gulp-load-plugins');

/* Plugins */
// { autoprefixer, cleanCss, htmlmin, if, imagemin, notify, plumber, sass, sassGlob, sourcemaps, uglify, zip }
const $ = plugins();

// Archive
function archive() {
    return gulp
        .src('dist/**/*')
        .pipe($.zip(`${process.env.npm_package_name}.zip`))
        .pipe(gulp.dest('./'));
}

module.exports = archive;
