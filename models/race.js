const mongoose = require('mongoose');
const { Schema } = mongoose;
const bonus = require('./bonus');

const raceSchema = new Schema({
	name: { type: String, required: true },
	speed: { type: Number, required: true },
	weaponProficiencies: { type: String, default: '[]' },
	armorProficiencies: { type: String, default: '[]' },
	toolProficiencies: { type: String, default: '[]' },
	languages: { type: String, default: '[]' },
	racialBonuses: { type: [bonus.bonusSchema] }
});

const Race = mongoose.model('Race', raceSchema);

module.exports = { raceSchema };
