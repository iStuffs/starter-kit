const browserSync = require('browser-sync');

// Browser Reload
function browserReload(done) {
    browserSync.reload();
    done();
}

module.exports = browserReload;
