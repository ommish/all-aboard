const path = require('path');
const variables = require('./config/keys');

const express = require('express');
const app = express();

const mongoose = require('mongoose');
mongoose.connect(`${variables.DATABASE}`);
require('./models/user');

const cookieSession = require('cookie-session');
const passport = require('passport');
app.use(cookieSession({
  maxAge: 30 * 24 * 60 * 60 * 1000,
  keys: [variables.COOKIE_KEY],
}));
app.use(passport.initialize())
app.use(passport.session())
require('./services/passport');

require('./routes/auth_routes')(app);

app.get('/', (req, res) => {
  res.send('landed')
});

const PORT = process.env.PORT || 3000;

app.listen(PORT);
