const gulp = require('gulp');

/* Configuration */
const {
    ASSETS,
    PATH,
} = require('./config.json');

/* ASSETS - json and fonts */
function assets() {
    return gulp
        .src(PATH.src + ASSETS.src)
        .pipe(gulp.dest(PATH.dest + ASSETS.dest)); // JSON (.json) and fonts (*.{eot,otf,svg,ttf,woff,woff2})
}

module.exports = assets;
