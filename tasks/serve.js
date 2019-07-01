const browserSync = require('browser-sync');

/* Configuration */
const {
    PATH,
    SERVER,
} = require('./config.json');

/* Serve */
const serve = (done) => {
    browserSync.init({
        server: {
            baseDir: PATH.dest,
        },
        port: SERVER.port,
    });
    done();
};

module.exports = serve;
