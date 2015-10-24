const webpack = require('webpack');
const path = require('path');

module.exports = {
  devtool: 'eval',
  entry: {
    app: [
      'webpack-hot-middleware/client',
      './src/index.jsx',
    ],
  },
  output: {
    path: '/',
    publicPath: '/static/',
    filename: '/static/app.js',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
  module: {
    loaders: [{
      test: /\.(jsx|js)$/,
      exclude: /(node_modules|bower_components)/,
      loaders: [ 'babel' ],
    }, {
      test: /\.css$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'css',
    }, {
      test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9]*)?$/,
      loader: 'base64-font-loader',
    }],
  },
};
