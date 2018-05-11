/* gulp plugins variables */

const gulp         = require('gulp');
const sass         = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const rename       = require('gulp-rename');
const cleanCss     = require('gulp-clean-css');
const htmlMin      = require('gulp-htmlmin');
const uglify       = require('gulp-uglify');
const browserSync  = require('browser-sync');
const sourcemaps   = require('gulp-sourcemaps');
const imagemin     = require('gulp-imagemin');
const babel        = require('gulp-babel');
const plumber      = require('gulp-plumber');
const notify       = require('gulp-notify');
const zip          = require('gulp-zip');
const rm          = require('rimraf');
const gulpif       = require('gulp-if');
const { argv }     = require('yargs');


/* tasks declaration */
gulp.task('cssTask', () => {
    gulp.src('./src/sass/**/*.{sass,scss}')
        .pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
        .pipe(gulpif(!argv.production, sourcemaps.init()))
        .pipe(sass().on('error', sass.logError))
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
});

gulp.task('htmlTask', () => {
    gulp.src('src/*.html')
        .pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
        .pipe(gulpif(argv.production, htmlMin({ collapseWhitespace: true })))
        .pipe(gulp.dest('dist'));
});

gulp.task('jsTask', () => {
    gulp.src('./src/js/*.js')
        .pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
        .pipe(babel({ presets: ['env'] }))
        .pipe(gulpif(argv.production, uglify()))
        .pipe(rename((path) => { path.basename += '.min'; }))
        .pipe(gulp.dest('./dist/js'));
});

gulp.task('imgTask', () => {
    gulp.src('src/img/*.{gif,jpg,png,svg,jpeg}')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'));
});

gulp.task('compress', () => {
    gulp.src('dist/**/*')
        .pipe(zip(`${process.env.npm_package_name}.zip`))
        .pipe(gulp.dest('./'));
});

gulp.task('cleanDist', (done) => {
    rm('./dist/', done);
});

gulp.task('refresh', () => {
    browserSync.init({
        server: {
            baseDir: './dist/',
        },
        port: '8080',
    });
});

/* default task and watch */
gulp.task('watch', ['cssTask', 'jsTask', 'htmlTask', 'refresh', 'imgTask'], () => {
    gulp.watch('./src/sass/**/*.{sass,scss}', ['cssTask']);
    gulp.watch('./src/js/*.js', ['jsTask']);
    gulp.watch('./src/*.html', ['htmlTask']);
    gulp.watch('./dist/*.html').on('change', browserSync.reload);
    gulp.watch('./dist/css/*.css').on('change', browserSync.reload);
    gulp.watch('./dist/js/*.js').on('change', browserSync.reload);
});

gulp.task('default', ['watch']);
