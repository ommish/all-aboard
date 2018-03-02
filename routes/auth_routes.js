const passport = require('passport');
const AuthController = require('../controllers/auth_controller');

module.exports = (app) => {
	app.get(
		'/auth/google',
		passport.authenticate('google', {
			scope: ['profile', 'email']
		})
	);

	app.get(
		'/auth/google/callback',
		passport.authenticate('google'),
		AuthController.authCallback
	);

	app.get('/api/current_user', AuthController.currentUser);

	app.get('/api/logout', AuthController.logout);
};
