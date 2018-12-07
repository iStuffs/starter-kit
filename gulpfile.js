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

/* Plugins */
// { autoprefixer, cleanCss, htmlmin, if, imagemin, notify, plumber, sass, sassGlob, sourcemaps, uglify, zip }
const $ = plugins();

/* tasks declaration */
function cssTask() {
    return gulp.src('./src/assets/sass/**/*.{sass,scss}')
        .pipe($.plumber({ errorHandler: $.notify.onError('Error: <%= error.message %>') }))
        .pipe($.if(!argv.production, $.sourcemaps.init()))
        .pipe($.sassGlob())
        .pipe($.sass(eyeglass()).on('error', $.sass.logError))
        .pipe($.autoprefixer({
            browsers: ['last 6 versions'],
            cascade: false,
        }))
        .pipe($.cleanCss({
            compatibility: 'ie8',
        }))
        .pipe($.if(!argv.production, $.sourcemaps.write('.')))
        .pipe(gulp.dest('./dist/assets/css'));
}

function htmlTask() {
    return gulp.src('src/pages/**/*.{html,hbs,handlebars}')
        .pipe($.plumber({ errorHandler: $.notify.onError('Error: <%= error.message %>') }))
        .pipe(panini({
            root: 'src/pages/',
            layouts: 'src/layouts/',
            partials: 'src/partials/',
            helpers: 'src/helpers/',
            data: 'src/data/',
        }))
        .pipe($.if(argv.production, $.htmlmin({ collapseWhitespace: true })))
        .pipe(gulp.dest('dist'));
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
    return gulp.src('./src/assets/scripts/**/*.js')
        .pipe(named())
        .pipe($.plumber({ errorHandler: $.notify.onError('Error: <%= error.message %>') }))
        .pipe($.if(!argv.production, $.sourcemaps.init()))
        .pipe(webpackStream(webpackConfig, webpack))
        .pipe($.if(argv.production, $.uglify()))
        .pipe($.if(!argv.production, $.sourcemaps.write('.')))
        .pipe(gulp.dest('./dist/assets/scripts'));
}

function imgTask() {
    return gulp.src('src/assets/imgages/*.{gif,jpg,png,svg,jpeg}')
        .pipe($.imagemin())
        .pipe(gulp.dest('dist/img'));
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
            baseDir: './dist/',
        },
        port: '8080',
    });
    done();
}

gulp.task('build', gulp.series(cssTask, jsTask, htmlTask, imgTask));

/* default task and watch */
gulp.task('watch', gulp.series('build', refresh, () => {
    gulp.watch('./src/assets/sass/**/*.{sass,scss}', gulp.series(cssTask));
    gulp.watch('./src/assets/scripts/*.js', gulp.series(jsTask));
    gulp.watch('./src/*.html', gulp.series(htmlTask));
    gulp.watch('./src/{layouts,partials,helpers,data}/**/*', gulp.series(panini.refresh));
    gulp.watch('./dist/*.html').on('change', browserSync.reload);
    gulp.watch('./dist/assets/css/*.css').on('change', browserSync.reload);
    gulp.watch('./dist/assets/scripts/*.js').on('change', browserSync.reload);
}));

gulp.task('default', argv.production ? gulp.series('build') : gulp.series('watch'));
