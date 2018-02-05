const path = require('path');
require('dotenv').config({path: path.join(__dirname, '.env')})

const mongoose = require('mongoose');
mongoose.connect(`${process.env.DATABASE}`);
const db = mongoose.connection;
let userSchema, User;
db.on('error', (err) => {console.error(err)});
db.once('open', () => {
  userSchema = new mongoose.Schema({
    name: String,
  });
  User = mongoose.model('User', userSchema);
});

const bodyParser = require('body-parser');

const webpack = require('webpack')
const config = require('./webpack.config.dev');
const compiler = webpack(config);

const express = require('express');
const app = express();
app.use(bodyParser.urlencoded({extended: true}))
app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.get('/', (req, res) => {
  User.find((err, userCollection) => {
    if (err) {
      console.log(err);
    } else {
      console.log(userCollection);
    }
  });
  res.sendFile(path.resolve(__dirname + '/app/index.html'));
});

app.post('/quotes', (req, res) => {
  console.log(req.body.quote);
});

app.listen(3000, () => {
  console.log("hi");
});
