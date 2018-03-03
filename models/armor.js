const mongoose = require('mongoose');
const { Schema } = mongoose;
const armorSchema = new Schema({
	name: { type: String, default: '' },
	type: { type: String, default: '' },
	stealthDisadvantage: { type: Boolean, default: false },
	weight: { type: Number, default: 0 },
	strengthMin: { type: Number, default: 0 },
	baseAc: { type: Number, default: 11 },
	acMod: { type: String, default: '' },
	acModLimit: { type: Number, default: 0 }
});

const Armor = mongoose.model('Armor', armorSchema);

module.exports = { armorSchema };
