/* gulp plugins variables */

const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');
const cleanCss = require('gulp-clean-css');
const htmlMin = require('gulp-htmlmin');
const uglify = require('gulp-uglify');
const browserSync = require('browser-sync');
const sourcemaps = require('gulp-sourcemaps');
const imagemin = require('gulp-imagemin');
const babel  = require('gulp-babel');
const plumber = require('gulp-plumber');
const notify  = require('gulp-notify');
const zip  = require('gulp-zip');
const rm  = require('rimraf');
const gulpif = require('gulp-if');
const { argv } = require('yargs');
const eyeglass = require('eyeglass');
const webpackStream = require('webpack-stream');
const webpack = require('webpack');
const named = require('vinyl-named');


/* tasks declaration */
function cssTask() {
    return gulp.src('./src/sass/**/*.{sass,scss}')
        .pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
        .pipe(gulpif(!argv.production, sourcemaps.init()))
        .pipe(sass(eyeglass()).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 6 versions'],
            cascade: false,
        }))
        .pipe(cleanCss({
            compatibility: 'ie8',
        }))
        .pipe(rename((path) => { path.basename += '.min'; }))
        .pipe(gulpif(!argv.production, sourcemaps.write('.')))
        .pipe(gulp.dest('./dist/css'));
}

function htmlTask() {
    return gulp.src('src/*.html')
        .pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
        .pipe(gulpif(argv.production, htmlMin({ collapseWhitespace: true })))
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
    return gulp.src('./src/js/**/*.js')
        .pipe(named())
        .pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
        .pipe(gulpif(!argv.production, sourcemaps.init()))
        .pipe(webpackStream(webpackConfig, webpack))
        .pipe(gulpif(argv.production, uglify()))
        .pipe(gulpif(!argv.production, sourcemaps.write('.')))
        .pipe(gulp.dest('./dist/js'));
}

function imgTask() {
    return gulp.src('src/img/*.{gif,jpg,png,svg,jpeg}')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'));
}

function compress() {
    return gulp.src('dist/**/*')
        .pipe(zip(`${process.env.npm_package_name}.zip`))
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
    gulp.watch('./src/sass/**/*.{sass,scss}', gulp.series(cssTask));
    gulp.watch('./src/js/*.js', gulp.series(jsTask));
    gulp.watch('./src/*.html', gulp.series(htmlTask));
    gulp.watch('./dist/*.html').on('change', browserSync.reload);
    gulp.watch('./dist/css/*.css').on('change', browserSync.reload);
    gulp.watch('./dist/js/*.js').on('change', browserSync.reload);
}));

gulp.task('default', gulpif(argv.production, gulp.series('build'), gulp.series('watch')));
