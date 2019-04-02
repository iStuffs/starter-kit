const futhark = require('./index');

module.exports = function (eyeglass, sass) {
    return {
        sassDir: futhark.includePaths[0],
    };
};
