const mongoose = require('mongoose');
const { Schema } = mongoose;
const weaponSchema = new Schema({
	name: { type: String, required: true },
	damageRoll: { type: Number, enum: [4, 6, 8, 10, 12, 20], default: 8},
	modifier: { type: String, enum: ['strength', 'dexterity', 'wisdom', 'charisma', 'intelligence'], default: 'strength'},
	proficiency: { type: Boolean, default: false },
	description: { type: String, default: ''},
	bonusAmount: { type: Number, default: 0},
	damageDice: { type: Number, default: 1},
});

const Weapon = mongoose.model('Weapon', weaponSchema);

module.exports = { weaponSchema };
