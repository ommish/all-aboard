const requireLogin = require('../middlewares/require_login');
const UsersController = require('../controllers/users_controller');

module.exports = (app) => {
	app.get(
		'/api/users/:userId/characters',
		requireLogin,
		UsersController.get
	);
};
