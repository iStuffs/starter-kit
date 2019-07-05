const path = require('path')

const configureWebpack = {
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, '../src/assets/scripts/components'),
    }
  },
  module: {
    rules: [{
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader'],
        include: path.resolve(__dirname, "../src/assets/sass/"),
    }]
  },
}

module.exports = configureWebpack;
