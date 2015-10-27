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
    new webpack.DefinePlugin({
      __APIURL__: JSON.stringify(process.env.APIURL || 'http://localhost:3001'),
      __DEVELOPMENT__: true,
      __DEVTOOLS__: true,
    }),
  ],
  resolve: {
    root: path.resolve(__dirname),
    extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx'],
  },
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
