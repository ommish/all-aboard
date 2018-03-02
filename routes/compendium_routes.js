const requireLogin = require('../middlewares/require_login');
const CompendiumController = require('../controllers/compendium_controller');

module.exports = (app) => {
	app.get('/api/compendium', requireLogin, CompendiumController.get);
};
