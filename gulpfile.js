/* Imports */
const args = require('yargs').argv;
const browserSync = require('browser-sync');
const eyeglass = require('eyeglass');
const gulp = require('gulp');
const named = require('vinyl-named');
const panini = require('panini');
const plugins = require('gulp-load-plugins');
const rm = require('rimraf');
const sassdoc = require('sassdoc');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');

const { VueLoaderPlugin } = require('vue-loader');

/* Plugins */
// { autoprefixer, cleanCss, htmlmin, if, imagemin, notify, plumber, sass, sassGlob, sourcemaps, uglify, zip }
const $ = plugins();

/* Configuration */
const {
    ASSETS,
    COMPATIBILITY,
    CSS,
    DOC,
    ERROR,
    HTML,
    IMAGES,
    JS,
    PATH,
    SERVER,
} = require('./config.json');

const production = !!args.production;

/* ASSETS - json and fonts */
function assets() {
    return gulp
        .src(PATH.src + ASSETS.src)
        .pipe(gulp.dest(PATH.dest + ASSETS.dest)); // JSON (.json) and fonts (*.{eot,otf,svg,ttf,woff,woff2})
}

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

/* HTML */
function html() {
    return gulp
        .src(PATH.src + HTML.entries)
        .pipe($.plumber({ errorHandler: $.notify.onError(ERROR) }))
        .pipe(panini(HTML.paniniOptions))
        .pipe($.if(production, $.htmlmin({ collapseWhitespace: true })))
        .pipe(gulp.dest(PATH.dest + HTML.dest));
}

function paniniRefresh(done) {
    panini.refresh();
    done();
}

/* IMAGES */
function images() {
    return gulp
        .src(PATH.src + IMAGES.src)
        .pipe($.imagemin())
        .pipe(gulp.dest(PATH.dest + IMAGES.dest));
}

/* JS */
const webpackConfig = {
    mode: production ? 'production' : 'development',
    module: {
        rules: [
            {
                test: /.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                            compact: false,
                        },
                    },
                ],
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'sass-loader',
                ],
            },
        ],
    },
    plugins: [
        // make sure to include the plugin!
        new VueLoaderPlugin(),
    ],
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            vue$: 'vue/dist/vue.common.js',
        },
    },
    devtool: !production && 'source-map',
};

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

/* OTHERS FUNCTIONS */
// Archive
function archive() {
    return gulp
        .src('dist/**/*')
        .pipe($.zip(`${process.env.npm_package_name}.zip`))
        .pipe(gulp.dest('./'));
}

// Browser Reload
function browserReload(done) {
    browserSync.reload();
    done();
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
