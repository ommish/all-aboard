const path = require('path');
const variables = require('../config/keys')

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const mongoose = require('mongoose');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((userId, done) => {
	User.findById(userId).then((user) => {
		done(null, user);
	});
});

passport.use(
	new GoogleStrategy(
		{
			clientID: variables.GOOGLE_CLIENT_ID,
			clientSecret: variables.GOOGLE_CLIENT_SECRET,
			callbackURL: 'http://localhost:3000/auth/google/callback'
		},
		(accessToken, refreshToken, profile, done) => {
			User.findOne({ googleId: profile.id }).then((existingUser) => {
				if (existingUser) {
					done(null, existingUser);
				} else {
					new User({ googleId: profile.id }).save().then((newUser) => {
						done(null, newUser);
					});
				}
			});
		}
	)
);
