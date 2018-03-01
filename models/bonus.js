const mongoose = require('mongoose');
const { Schema } = mongoose;
const bonusSchema = new Schema({
	name: { type: String, default: '' },
	description: { type: String, default: '' },
	field: {
		type: String,
		enum: [
			'initiative',
			'armorClass',
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
	bonusAmount: { type: Number, default: 0 }
});

const Bonus = mongoose.model('Bonus', bonusSchema);

module.exports = { bonusSchema };
