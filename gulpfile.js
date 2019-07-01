/* Imports */
const { series, parallel, watch } = require('gulp');

/* Configuration */
const {
    ASSETS,
    CSS,
    HTML,
    IMAGES,
    JS,
    PATH,
} = require('./tasks/config.json');
const production = require('./tasks/helper/mode');

/* Tasks */
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
    serve,
} = require('./tasks');


/* Archive */
const archiveTask = series(archive);

/* Build */
const buildTask = series(clean, parallel(assets, css, js, images, html));

/* Doc */
const docTask = series(doc);

/* Watching */
const watchTask = series(buildTask, serve, () => {
    // assets
    watch(PATH.src + ASSETS.src, series(assets))
        .on('all', series(browserReload));
    // css
    watch(PATH.src + CSS.src, series(css))
        .on('all', series(browserReload));
    // html
    watch(PATH.src + HTML.src)
        .on('all', series(paniniRefresh, html, browserReload));
    // images
    watch(PATH.src + IMAGES.src, series(images))
        .on('all', series(browserReload));
    // javascript
    watch(PATH.src + JS.src, series(js))
        .on('all', series(browserReload));
});

/* Exports */
module.exports = {
    default: production ? series(buildTask) : series(watchTask),
    archive: archiveTask,
    build: buildTask,
    doc: docTask,
    watch: watchTask,
};
