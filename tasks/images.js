const { src, dest, lastRun } = require('gulp');
const plugins = require('gulp-load-plugins');

/* Plugins */
const $ = plugins();

/* Configuration */
const {
    IMAGES,
    PATH,
} = require('./config.json');

/* IMAGES */
function images() {
    return src(PATH.src + IMAGES.src,  { since: lastRun(images) })
        .pipe($.imagemin())
        .pipe(dest(PATH.dest + IMAGES.dest));
}

module.exports = images;
