const { src } = require('gulp');
const sassdoc = require('sassdoc');

/* Configuration */
const {
    CSS,
    DOC,
    PATH,
} = require('./config.json');

// Doc - Sass Documentation
function doc() {
    return src(PATH.src + CSS.src)
        .pipe(sassdoc(DOC.sassDocOptions));
}

module.exports = doc;
