const requireLogin = require('../middlewares/require_login');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Race = mongoose.model('Race');
const CharClass = mongoose.model('CharClass');
const { camelCase } = require('lodash');

module.exports = (app) => {
	app.get('/api/compendium', requireLogin, async (req, res) => {
		const models = [Race, CharClass];
		const data = {};
		for (let i = 0; i < models.length; i++) {
			data[models[i].modelName] = {};
			const docs = await models[i].find({});
			for (let j = 0; j < docs.length; j++) {
				data[models[i].modelName][docs[j]._id] = docs[j];
			}
		}
		return res.send(data);
	});
};
