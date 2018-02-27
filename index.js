const path = require('path');
const variables = require('./config/keys');

const express = require('express');
const app = express();

const mongoose = require('mongoose');
mongoose.connect(`${variables.DATABASE}`);
require('./models/user');
require('./models/character');

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
require('./routes/character_routes')(app);

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'public', 'index.html'));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT);
