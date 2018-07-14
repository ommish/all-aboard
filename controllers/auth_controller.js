const passport = require('passport');

module.exports = {
	authCallback: (req, res) => {
		res.redirect('/');
	},
	currentUser: (req, res) => {
		res.send(req.user);
	},
	logout: (req, res) => {
		req.logout();
		res.redirect('/');
	}
};
