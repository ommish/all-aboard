const requireLogin = require('../middlewares/require_login');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Race = mongoose.model('Race');

module.exports = (app) => {
	app.get('/api/compendium', requireLogin, async (req, res) => {
		const racesArr = await Race.find({});
    const races = {};
    racesArr.forEach((race) => {
      races[race._id] = race;
    });
		res.send({ races });
	});
};
