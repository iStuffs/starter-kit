/* gulp plugins variables*/

var gulp         = require('gulp'),
    sass         = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    rename       = require('gulp-rename'),
    cleanCss     = require('gulp-clean-css'),
    htmlMin      = require('gulp-htmlmin'),
    uglify       = require('gulp-uglify'),
    browserSync  = require('browser-sync'),
    sourcemaps   = require('gulp-sourcemaps'),
    imagemin     = require('gulp-imagemin'),
    babel        = require('gulp-babel'),
    plumber      = require('gulp-plumber'),
    notify       = require("gulp-notify");


/* tasks declaration*/
gulp.task('cssTask', function () {
  return gulp.src('./src/sass/**/*.sass')
  .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
  .pipe(sourcemaps.init())
  .pipe(sass().on('error', sass.logError))
  .pipe(autoprefixer({
      browsers: ['last 6 versions'],
      cascade: false
  }))
  .pipe(cleanCss({
    compatibility: 'ie8'
  }))
  .pipe(rename(function(path){ path.basename += ".min"; }))
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest('./dist/css'));
});

gulp.task('htmlTask', function() {
  return gulp.src('src/*.html')
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(htmlMin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'));
});

gulp.task('jsTask', function() {
  return gulp.src('./src/js/*.js')
  .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
  .pipe(babel({ presets: ['es2015'] }))
  .pipe(uglify())
  .pipe(rename(function(path){ path.basename += ".min"; }))
  .pipe(gulp.dest('./dist/js'));
});
gulp.task('compression', function() {
      return gulp.src('src/img/*.{gif,jpg,png,svg,jpeg}')
      .pipe(imagemin())
      .pipe(gulp.dest('dist/img'));
});

gulp.task('refresh', function() {
  browserSync.init({
    server: {
      baseDir: "./dist/"
    }
  });
});

/* default task and watch */
gulp.task('watch', ['cssTask', 'jsTask', 'htmlTask', 'refresh', 'compression'], function () {
  gulp.watch('./src/sass/**/*.sass', ['cssTask']);
  gulp.watch('./src/js/*.js', ['jsTask']);
  gulp.watch('./src/*.html', ['htmlTask']);
  gulp.watch('./dist/*.html').on('change', browserSync.reload);
  gulp.watch('./dist/css/*.css').on('change', browserSync.reload);
  gulp.watch('./dist/js/*.js').on('change', browserSync.reload);
});

gulp.task('default', ['watch']);
