const style = require('./index');

module.exports = function (eyeglass, sass) {
    return {
        sassDir: style.includePaths[0],
    };
};
