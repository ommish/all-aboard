const mongoose = require('mongoose');
const { Schema } = mongoose;
const bonus = require('./bonus');

const charClassSchema = new Schema({
	name: { type: String, required: true },
	hitDie: { type: Number, required: true },
	weaponProficiencies: { type: String, default: '[]' },
	toolProficiencies: { type: String, default: '[]' },
	languages: { type: String, default: '[]' },
	savingThrows: { type: String, default: '[]' },
	classBonuses: { type: [bonus.bonusSchema] }
});

const CharClass = mongoose.model('CharClass', charClassSchema);

const charClasses = [
	{
		name: 'Barbarian',
		hitDie: 12
	},
	{
		name: 'Bard',
		hitDie: 8
	},
	{
		name: 'Cleric',
		hitDie: 8
	},
	{
		name: 'Druid',
		hitDie: 8
	},
	{
		name: 'Fighter',
		hitDie: 10
	},
	{
		name: 'Monk',
		hitDie: 8
	},
	{
		name: 'Paladin',
		hitDie: 10
	},
	{
		name: 'Ranger',
		hitDie: 10
	},
	{
		name: 'Rogue',
		hitDie: 8
	},
	{
		name: 'Sorcerer',
		hitDie: 6
	},
	{
		name: 'Warlock',
		hitDie: 8
	},
	{
		name: 'Wizard',
		hitDie: 6
	}
];

const seedCharClass = async () => {
	await CharClass.remove();
	charClasses.forEach(async (charClass) => {
		await new CharClass(charClass).save();
	});
};
seedCharClass();

module.exports = { charClassSchema };
