const args = require('yargs').argv;

module.exports = !!args.production;
