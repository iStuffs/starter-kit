const path = require('path')
const { merge } = require('lodash')
const configureWebpack = {
    resolve: {
      alias: {
        '@components': path.resolve(__dirname, 'src/components'),
      }
    }
  }
module.exports = configureWebpack;
