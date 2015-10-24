var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('../src/webpack.config-dev');

var app = express();
var compiler = webpack(config);

var dev = require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
});

app.use(dev);

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', function(req, res) {
  dev.fileSystem.stat(req.url, function(err) {
    if (err || req.url === '/') {
      return res.sendFile(path.join(__dirname, '..', config.output.path, 'www/index.html'));
    }

    dev.fileSystem.readFile(req.url, function(error, file) {
      res.end(file);
    });
  });
});

app.listen(3002, 'localhost', function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://localhost:3002');
});
