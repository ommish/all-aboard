const mongoose = require('mongoose');
const { Schema } = mongoose;
const bonus = require('./bonus');

const raceSchema = new Schema({
	name: { type: String, required: true },
	speed: { type: Number, required: true },
	weaponProficiencies: { type: String, default: '[]' },
	toolProficiencies: { type: String, default: '[]' },
	languages: { type: String, default: '[]' },
	racialBonuses: { type: [bonus.bonusSchema] }
});

const Race = mongoose.model('Race', raceSchema);

const commonBonuses = {
	name: 'Darkvision',
	description:
		'Accustomed to life underground, you have superior vision in dark and dim Conditions. You can see in dim light within 60 feet of you as if it were bright light, and in Darkness as if it were dim light. You can’t discern color in Darkness, only shades of gray.',
	field: '',
	bonusAmount: 0
};

const races = [
	{
		name: 'Dwarf',
		speed: 25,
		weaponProficiencies: '',
		toolProficiencies: '',
		languages: '["Common", "Dwarvish"]',
		racialBonuses: [
			{
				name: 'Darkvision',
				description:
					'Accustomed to life underground, you have superior vision in dark and dim Conditions. You can see in dim light within 60 feet of you as if it were bright light, and in Darkness as if it were dim light. You can’t discern color in Darkness, only shades of gray.',
				field: '',
				bonusAmount: 0
			},
			{
				name: 'Dwarven Resilience',
				description:
					'You have advantage on saving throws against poison, and you have Resistance against poison damage.',
				field: '',
				bonusAmount: 0
			}
		]
	},
	{
		name: 'Elf',
		speed: 30,
		weaponProficiencies: '',
		toolProficiencies: '',
		languages: '',
		racialBonuses: []
	},
	{
		name: 'Halfling',
		speed: 25,
		weaponProficiencies: '',
		toolProficiencies: '',
		languages: '',
		racialBonuses: []
	},
	{
		name: 'Human',
		speed: 30,
		weaponProficiencies: '',
		toolProficiencies: '',
		languages: '',
		racialBonuses: []
	},
	{
		name: 'Dragonborn',
		speed: 30,
		weaponProficiencies: '',
		toolProficiencies: '',
		languages: '',
		racialBonuses: []
	},
	{
		name: 'Gnome',
		speed: 25,
		weaponProficiencies: '',
		toolProficiencies: '',
		languages: '',
		racialBonuses: []
	},
	{
		name: 'Half-Elf',
		speed: 30,
		weaponProficiencies: '',
		toolProficiencies: '',
		languages: '',
		racialBonuses: []
	},
	{
		name: 'Half-Orc',
		speed: 30,
		weaponProficiencies: '',
		toolProficiencies: '',
		languages: '',
		racialBonuses: []
	},
	{
		name: 'Tiefling',
		speed: 30,
		weaponProficiencies: '',
		toolProficiencies: '',
		languages: '',
		racialBonuses: []
	}
];

const seedRace = async () => {
	await Race.remove();
	races.forEach(async (race) => {
		await new Race(race).save();
	});
};
seedRace();

module.exports = { raceSchema };
