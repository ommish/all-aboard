const mongoose = require('mongoose');
const { Schema } = mongoose;
const bonus = require('./bonus');

const backgroundSchema = new Schema({
	name: { type: String, required: true },
	description: { type: String, default: '' },
	skillProficiencies: { type: String, default: '[]' },
	toolProficiencies: { type: String, default: '[]' },
	languages: { type: String, default: '[]' },
	backgroundBonuses: { type: [bonus.bonusSchema] },
	gold: { type: Number, default: 0 },
	equipment: { type: String, default: '[]' }
});

const Background = mongoose.model('Background', backgroundSchema);

module.exports = { backgroundSchema };
