const style = require('./index');

module.exports = function (_eyeglass, sass) {
    return {
        sassDir: style.includePaths[0],
    };
};
