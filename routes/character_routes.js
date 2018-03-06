const requireLogin = require('../middlewares/require_login');
const CharactersController = require('../controllers/characters_controller');

module.exports = (app) => {
	app.post('/api/characters', requireLogin, CharactersController.post);

	app.put(
		'/api/characters/:characterId',
		requireLogin,
		CharactersController.put
	);

	app.delete(
		'/api/characters/:characterId',
		requireLogin,
		CharactersController.delete
	);

	app.get(
		'/api/characters/:characterId',
		requireLogin,
		CharactersController.get
	);
};
