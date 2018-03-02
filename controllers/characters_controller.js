const mongoose = require('mongoose');
const Character = mongoose.model('Character');

module.exports = {
	post: async (req, res) => {
		let newChar = new Character(req.body);
		newChar._user = req.user._id;
		if (!req.body.charClass) req.body.charClass = undefined;
		if (!req.body.race) req.body.race = undefined;
		if (!req.body.background) req.body.background = undefined;
		try {
			newChar = await newChar.save();
			res.send(newChar);
		} catch (err) {
			res.status(422).send(err);
		}
	},
	put: async (req, res) => {
		try {
			let newChar = await Character.findById(req.params.characterId);
			if (JSON.stringify(newChar._user) !== JSON.stringify(req.user._id)) {
				res
					.status(401)
					.send({ error: 'You are not authorized to edit this character' });
			} else {
				if (!req.body.charClass) req.body.charClass = undefined;
				if (!req.body.race) req.body.race = undefined;
				if (!req.body.background) req.body.background = undefined;
				await newChar.update(req.body);
				newChar = await Character.findById(req.params.characterId);
				res.send(newChar);
			}
		} catch (err) {
			res.status(422).send(err);
		}
	},
  get: async (req, res) => {
    const character = await Character.findOne({ _id: req.params.characterId });
    if (character) {
      res.send(character);
    } else {
      res.status(404).send();
    }
  }

};
