const path = require('path');
const variables = require('../config/keys');

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const mongoose = require('mongoose');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser(async (userId, done) => {
	const user = await User.findById(userId);
	done(null, user);
});

passport.use(
	new GoogleStrategy(
		{
			clientID: variables.GOOGLE_CLIENT_ID,
			clientSecret: variables.GOOGLE_CLIENT_SECRET,
			callbackURL: '/auth/google/callback',
			proxy: true
		},
		async (accessToken, refreshToken, profile, done) => {
			const existingUser = await User.findOne({ googleId: profile.id });
			if (existingUser) {
				done(null, existingUser);
			} else {
				const newUser = await new User({
					googleId: profile.id,
					displayName: profile.displayName
				}).save();
				done(null, newUser);
			}
		}
	)
);
