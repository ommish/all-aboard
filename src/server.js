const path = require('path');
require('dotenv').config({path: path.join(__dirname, '.env')});

const express = require('express');
const app = express();

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
  res.sendFile(path.resolve(__dirname + '/frontend/index.html'));
});













app.listen(3000, () => {
  console.log("listening");
});
