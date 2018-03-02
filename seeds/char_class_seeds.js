const mongoose = require('mongoose');
const CharClass = mongoose.model('CharClass');

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
