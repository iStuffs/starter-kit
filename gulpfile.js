/* Imports */
const args = require('yargs').argv;
const browserSync = require('browser-sync');
const gulp = require('gulp');

const {
    archive,
    assets,
    browserReload,
    clean,
    css,
    doc,
    html,
    images,
    js,
    paniniRefresh,
} = require('./tasks');


/* Configuration */
const {
    ASSETS,
    CSS,
    HTML,
    IMAGES,
    JS,
    PATH,
    SERVER,
} = require('./config.json');

const production = !!args.production;

/* Archive */
gulp.task('archive', gulp.series(archive));

/* Build */
gulp.task('build', gulp.series(clean, assets, css, js, images, html));

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
        gulp.watch(PATH.src + ASSETS.src, gulp.series(assets)).on(
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
