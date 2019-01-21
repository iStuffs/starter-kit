/* gulp plugins variables */
const gulp = require('gulp');
const plugins = require('gulp-load-plugins');
const browserSync = require('browser-sync');
const rm  = require('rimraf');
const { argv } = require('yargs');
const eyeglass = require('eyeglass');
const webpackStream = require('webpack-stream');
const webpack = require('webpack');
const named = require('vinyl-named');
const panini = require('panini');
const sassdoc = require('sassdoc');

/* Plugins */
// { autoprefixer, cleanCss, htmlmin, if, imagemin, notify, plumber, sass, sassGlob, sourcemaps, uglify, zip }
const $ = plugins();
const { PATHS, HTML, CSS, JS, IMAGES, JSON, FONTS, COMPATIBILITY, SERVER } = require('./config.json');

/* tasks declaration */
function cssTask() {
    return gulp.src(PATHS.assets + CSS.src)
        .pipe($.plumber({ errorHandler: $.notify.onError('Error: <%= error.message %>') }))
        .pipe($.if(!argv.production, $.sourcemaps.init()))
        .pipe($.sassGlob())
        .pipe($.sass(eyeglass()).on('error', $.sass.logError))
        .pipe($.autoprefixer({
            browsers: COMPATIBILITY,
            cascade: false,
        }))
        .pipe($.cleanCss({
            compatibility: 'ie11',
        }))
        .pipe($.if(!argv.production, $.sourcemaps.write('.')))
        .pipe(gulp.dest(CSS.dest));
}

function htmlTask() {
    return gulp.src(PATHS.src + HTML.src)
        .pipe($.plumber({ errorHandler: $.notify.onError('Error: <%= error.message %>') }))
        .pipe(panini({
            root: HTML.root,
            layouts: HTML.layouts,
            partials: HTML.partials,
            helpers: HTML.helpers,
            data: HTML.data,
        }))
        .pipe($.if(argv.production, $.htmlmin({ collapseWhitespace: true })))
        .pipe(gulp.dest(PATHS.dest));
}

const webpackConfig = {
    mode: (argv.production ? 'production' : 'development'),
    module: {
        rules: [{
            test: /.js$/,
            use: [{
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env'],
                    compact: false,
                },
            }],
        }],
    },
    devtool: !argv.production && 'source-map',
};
function jsTask() {
    return gulp.src(PATHS.assets + JS.src)
        .pipe(named())
        .pipe($.plumber({ errorHandler: $.notify.onError('Error: <%= error.message %>') }))
        .pipe($.if(!argv.production, $.sourcemaps.init()))
        .pipe(webpackStream(webpackConfig, webpack))
        .pipe($.if(argv.production, $.uglify()))
        .pipe($.if(!argv.production, $.sourcemaps.write('.')))
        .pipe(gulp.dest(JS.dest));
}

function imgTask() {
    return gulp.src(PATHS.assets + IMAGES.src)
        .pipe($.imagemin())
        .pipe(gulp.dest(IMAGES.dest));
}

function jsonTask() {
    return gulp.src(PATHS.assets + JSON.src)
        .pipe(gulp.dest(JSON.dest));
}

function fontsTask() {
    return gulp.src(PATHS.assets + FONTS.src)
        .pipe(gulp.dest(FONTS.dest));
}

function compress() {
    return gulp.src('dist/**/*')
        .pipe($.zip(`${process.env.npm_package_name}.zip`))
        .pipe(gulp.dest('./'));
}

function cleanDist(done) {
    rm('./dist/', done);
}

function refresh(done) {
    browserSync.init({
        server: {
            baseDir: PATHS.dest,
        },
        port: SERVER.port,
    });
    done();
}

function doc() {
    const sassDocOptions = {
        dest: 'docs',
    };
    return gulp.src('./src/sass/**/*.scss')
        .pipe(sassdoc(sassDocOptions));
}

gulp.task('build', gulp.series(cssTask, jsTask, htmlTask, imgTask, jsonTask, fontsTask));

/* default task and watch */
gulp.task('watch', gulp.series('build', refresh, () => {
    gulp.watch(PATHS.src + HTML.src, gulp.series(htmlTask));
    gulp.watch(PATHS.assets + CSS.src, gulp.series(cssTask));
    gulp.watch(PATHS.assets + JS.src, gulp.series(jsTask));
    gulp.watch(PATHS.assets + JSON.src, gulp.series(jsonTask));
    gulp.watch(PATHS.assets + FONTS.src, gulp.series(fontsTask));
    gulp.watch(PATHS.src + HTML.src, gulp.series(panini.refresh));
    gulp.watch('./dist/*.html').on('change', browserSync.reload);
    gulp.watch('./dist/assets/css/*.css').on('change', browserSync.reload);
    gulp.watch('./dist/assets/scripts/*.js').on('change', browserSync.reload);
    gulp.watch('./dist/assets/fonts/*.*').on('change', browserSync.reload);
    gulp.watch('./dist/assets/json/*.json').on('change', browserSync.reload);
}));

gulp.task('default', argv.production ? gulp.series('build') : gulp.series('watch'));

gulp.task('doc', gulp.series(doc));
