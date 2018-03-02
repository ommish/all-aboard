const path = require('path');
const variables = require('./config/keys');

const express = require('express');
const app = express();

const bodyParser = require('body-parser');

const mongoose = require('mongoose');
mongoose.connect(`${variables.DATABASE}`);
require('./models/user');
require('./models/armor');
require('./models/race');
require('./models/char_class');
require('./models/character');

// require('./seeds/armor_seeds');
// require('./seeds/race_seeds');
// require('./seeds/char_class_seeds');

const cookieSession = require('cookie-session');
const passport = require('passport');

app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000,
		keys: [variables.COOKIE_KEY]
	})
);
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());

require('./services/passport');
require('./routes/auth_routes')(app);
require('./routes/character_routes')(app);
require ('./routes/compendium_routes')(app);

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));
	const path = require('path');
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

const PORT = process.env.PORT || 5000;

app.listen(PORT);
