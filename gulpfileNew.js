/* Imports */
const browserSync = require('browser-sync');
const gulp = require('gulp');
const named = require('vinyl-named');
const webpack = require('webpack');
const plugins = require('gulp-load-plugins');
const webpackStream = require('webpack-stream');
const webpackConfig = require('./tasks/webpack.config');
const production = require('./tasks/helper/mode');

/* Plugins */
// { autoprefixer, cleanCss, htmlmin, if, imagemin, notify, plumber, sass, sassGlob, sourcemaps, uglify, zip }
const $ = plugins();

const {
    archive,
    browserReload,
    clean,
    copy,
    css,
    doc,
    html,
    images,
    // js,
    paniniRefresh,
} = require('./tasks');

/* Configuration */
const {
    ASSETS,
    CSS,
    ERROR,
    HTML,
    IMAGES,
    JS,
    PATH,
    SERVER,
} = require('./config.json');

function js() {
    return gulp
        .src(PATH.src + JS.entries)
        .pipe(named())
        .pipe($.plumber({ errorHandler: $.notify.onError(ERROR) }))
        .pipe($.if(!production, $.sourcemaps.init()))
        .pipe(webpackStream(webpackConfig, webpack))
        .pipe($.if(production, $.uglify()))
        .pipe($.if(!production, $.sourcemaps.write('.')))
        .pipe(gulp.dest(PATH.dest + JS.dest));
}

/* Archive */
gulp.task('archive', gulp.series(archive));

/* Build */
gulp.task('build', gulp.series(clean, copy, css, js, images, html));

/* Doc */
gulp.task('doc', gulp.series(doc));

/* Serve */
gulp.task('serve', (done) => {
    browserSync.init({
        server: {
            baseDir: PATH.dest,
        },
        port: SERVER.port,
    });
    done();
});

/* Watching */
gulp.task(
    'watch',
    gulp.series('build', 'serve', () => {
        // assets
        gulp.watch(PATH.src + ASSETS.src, gulp.series(copy)).on(
            'all',
            gulp.series(browserReload),
        );
        // css
        gulp.watch(PATH.src + CSS.src, gulp.series(css)).on(
            'all',
            gulp.series(browserReload),
        );
        // html
        gulp.watch(PATH.src + HTML.src).on(
            'all',
            gulp.series(paniniRefresh, html, browserReload),
        );
        // images
        gulp.watch(PATH.src + IMAGES.src, gulp.series(images)).on(
            'all',
            gulp.series(browserReload),
        );
        // javascript
        gulp.watch(PATH.src + JS.src, gulp.series(js)).on(
            'all',
            gulp.series(browserReload),
        );
    }),
);

/* Default task */
gulp.task('default', production ? gulp.series('build') : gulp.series('watch'));
