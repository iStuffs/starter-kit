const { src, dest } = require('gulp');
const zip = require('gulp-zip');

// Archive
function archive() {
    return src('dist/**/*')
        .pipe(zip(`${process.env.npm_package_name}.zip`))
        .pipe(dest('./'));
}

module.exports = archive;
