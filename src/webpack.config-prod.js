const webpack = require('webpack');

module.exports = {
  entry: {
    app: [
      './index.jsx',
    ],
  },
  output: {
    path: '../www',
    filename: 'static/app.js',
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
      },
      __APIURL__: JSON.stringify(process.env.APIURL || 'http://localhost:3001'),
      __DEVELOPMENT__: false,
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
      },
    }),
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
