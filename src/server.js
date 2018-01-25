const express = require('express');
// const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const path = require('path');

const webpack = require('webpack')
const config = require('./webpack.config.dev');
const compiler = webpack(config);
const app = express();
let db;

app.use(bodyParser.urlencoded({extended: true}))
app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

// MongoClient.connect('link', (err, database) => {
//   if (err) return console.log(err);

//
  app.listen(3000, () => {
    // db = database;
  });
// });

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname + '/app/index.html'));
});

app.post('/quotes', (req, res) => {
  console.log(req.body.quote);
});

// 1. install path
// 2. install webpack-dev-middleware to compile assets to serve
