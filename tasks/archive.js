const { src, dest } = require('gulp');
const plugins = require('gulp-load-plugins');

/* Plugins */
const $ = plugins();

// Archive
function archive() {
    return src('dist/**/*')
        .pipe($.zip(`${process.env.npm_package_name}.zip`))
        .pipe(dest('./'));
}

module.exports = archive;
