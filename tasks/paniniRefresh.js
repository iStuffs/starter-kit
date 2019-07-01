const panini = require('panini');

function paniniRefresh(done) {
    panini.refresh();
    done();
}

module.exports = paniniRefresh;
