const args = require('yargs').argv;

const production = !!args.production;

exports.default = production;

/*
// alternative to arguments
// in package.json
//   "scripts": {
//     "start": "gulp",
//     "build": "cross-env NODE_ENV=production gulp"
//   },
module.exports = {
  production: process.env.NODE_ENV === 'production',
};
*/
