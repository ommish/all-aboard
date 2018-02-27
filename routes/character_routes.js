const requireLogin = require('../middlewares/require_login');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Character = mongoose.model('Character');

module.exports = (app) => {
	app.post('/api/characters', requireLogin, async (req, res) => {
		let newChar = new Character(req.body);
		newChar._user = req.user._id;
		try {
			newChar = await newChar.save();
			res.send(newChar);
		} catch (err) {
			res.status(422).send(err);
		}
	});

	app.get('/api/characters/:characterId', requireLogin, async (req, res) => {
		const character = await Character.findOne({ _id: req.params.characterId });
		if (character) {
			res.send(character);
		} else {
			res.status(404).send();
		}
	});

	app.get('/api/users/:userId/characters', requireLogin, async (req, res) => {
		const user = await User.findById(req.params.userId);
		if (user) {
			const characters = await Character.where('_user', user._id);
			res.send(characters);
		} else {
			res.status(404).send({ error: 'No such user exists' });
		}
	});
};
