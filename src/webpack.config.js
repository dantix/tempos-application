const webpack = require('webpack');
const path = require('path');

module.exports = {
  devtool: 'eval',
  entry: {
    app: [
      'webpack-dev-server/client?http://localhost:3002/',
      'webpack/hot/only-dev-server',
      './index.jsx',
    ],
  },
  output: {
    path: '../www/',
    filename: 'app.js',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // new webpack.optimize.UglifyJsPlugin()
  ],
  devServer: {
    hot: true,
    // https://github.com/webpack/webpack-dev-server/issues/197
    historyApiFallback: {
      rewrites: [{
        from: /\.hot-update\.json$/,
        to: function rewrite(context) {
          return '/' + path.basename(context.parsedUrl.pathname);
        },
      }, {
        from: /\.hot-update\.js$/,
        to: function rewrite(context) {
          return '/' + path.basename(context.parsedUrl.pathname);
        },
      }],
    },
    contentBase: '../www',
    port: 3002,
  },
  module: {
    loaders: [{
      test: /\.(jsx|js)$/,
      exclude: /(node_modules|bower_components)/,
      loaders: [ 'react-hot', 'babel' ],
    }, {
      test: /\.css$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'css-loader',
    }, {
      test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9]*)?$/,
      loader: 'base64-font-loader',
    }],
  },
};
