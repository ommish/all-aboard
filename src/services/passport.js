const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../', '.env') });

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			callbackURL: 'http://localhost:3000/auth/google/callback'
		},
		(accessToken, refreshToken, profile, done) => {
			console.log('access token', accessToken);
			console.log('refresh token', refreshToken);
			console.log('profile token', profile);
		}
	)
);
