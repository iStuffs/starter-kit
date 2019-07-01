const { src, dest, lastRun } = require('gulp');
const imagemin = require('gulp-imagemin');

/* Configuration */
const {
    IMAGES,
    PATH,
} = require('./config.json');

/* IMAGES */
function images() {
    return src(PATH.src + IMAGES.src, { since: lastRun(images) })
        .pipe(imagemin())
        .pipe(dest(PATH.dest + IMAGES.dest));
}

module.exports = images;
