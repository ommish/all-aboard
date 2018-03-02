const mongoose = require('mongoose');
const { Schema } = mongoose;
const bonusSchema = new Schema({
	name: { type: String, default: '' },
	description: { type: String, default: '' },
	field: {
		type: String,
		default: '',
		enum: [
			'',
			'initiative',
			'armorClass',
			'speed',
			'acrobatics',
			'animalHandling',
			'arcana',
			'athletics',
			'deception',
			'history',
			'insight',
			'intimidation',
			'investigation',
			'medicine',
			'nature',
			'perception',
			'performance',
			'persuasion',
			'religion',
			'sleightOfHand',
			'stealth',
			'survival'
		]
	},
	bonusAmount: { type: Number, default: 0 },
	fromRace: { type: Boolean, default: false },
	fromClass: { type: Boolean, default: false }
});

const Bonus = mongoose.model('Bonus', bonusSchema);

module.exports = { bonusSchema };
