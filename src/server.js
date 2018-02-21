const path = require('path');
require('dotenv').config({path: path.join(__dirname, '.env')});

const express = require('express');
const app = express();

// const webpack = require('webpack');
// const config = require('./webpack.config.dev');
// const compiler = webpack(config);

const mongoose = require('mongoose');
mongoose.connect(`${process.env.DATABASE}`);
require('./models/user');

const cookieSession = require('cookie-session');
const passport = require('passport');
app.use(cookieSession({
  maxAge: 30 * 24 * 60 * 60 * 1000,
  keys: [process.env.COOKIE_KEY],
}));
app.use(passport.initialize())
app.use(passport.session())
require('./services/passport');

require('./routes/auth_routes')(app);

app.get('/', (req, res) => {
  // if (currentUser) res.cookie("user", JSON.stringify(currentUser));
  res.sendFile(path.resolve(__dirname + '/frontend/index.html'));
});













app.listen(3000, () => {
  console.log("listening");
});


// app.use(require('webpack-dev-middleware')(compiler, {
//   noInfo: true,
//   publicPath: config.output.publicPath,
// }));
//
//
// const bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({extended: true}));
