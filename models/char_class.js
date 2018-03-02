const mongoose = require('mongoose');
const { Schema } = mongoose;
const bonus = require('./bonus');

const charClassSchema = new Schema({
	name: { type: String, required: true },
	hitDie: { type: Number, required: true },
	weaponProficiencies: { type: String, default: '[]' },
	armorProficiencies: { type: String, default: '[]' },
	toolProficiencies: { type: String, default: '[]' },
	languages: { type: String, default: '[]' },
	savingThrows: { type: String, default: '[]' },
	classBonuses: { type: [bonus.bonusSchema] },
	equipment: { type: String, default: '[]' }
});

const CharClass = mongoose.model('CharClass', charClassSchema);

module.exports = { charClassSchema };
