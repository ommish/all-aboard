const mongoose = require('mongoose');
const Race = mongoose.model('Race');

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
		weaponProficiencies: [],
		toolProficiencies: [],
		languageProficiencies: [{ name: 'Common' }, { name: 'Dwarvish' }],
		racialBonuses: [
			{
				name: 'Darkvision',
				source: 'Dwarf',
				description:
					'Accustomed to life underground, you have superior vision in dark and dim Conditions. You can see in dim light within 60 feet of you as if it were bright light, and in Darkness as if it were dim light. You can’t discern color in Darkness, only shades of gray.',
				field: '',
				bonusAmount: 0
			},
			{
				name: 'Dwarven Resilience',
				source: 'Dwarf',
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
		weaponProficiencies: [],
		toolProficiencies: [],
		languageProficiencies: [],
		racialBonuses: []
	},
	{
		name: 'Halfling',
		speed: 25,
		weaponProficiencies: [],
		toolProficiencies: [],
		languageProficiencies: [],
		racialBonuses: []
	},
	{
		name: 'Human',
		speed: 30,
		weaponProficiencies: [],
		toolProficiencies: [],
		languageProficiencies: [],
		racialBonuses: []
	},
	{
		name: 'Dragonborn',
		speed: 30,
		weaponProficiencies: [],
		toolProficiencies: [],
		languageProficiencies: [],
		racialBonuses: []
	},
	{
		name: 'Gnome',
		speed: 25,
		weaponProficiencies: [],
		toolProficiencies: [],
		languageProficiencies: [],
		racialBonuses: []
	},
	{
		name: 'Half-Elf',
		speed: 30,
		weaponProficiencies: [],
		toolProficiencies: [],
		languageProficiencies: [],
		racialBonuses: []
	},
	{
		name: 'Half-Orc',
		speed: 30,
		weaponProficiencies: [],
		toolProficiencies: [],
		languageProficiencies: [],
		racialBonuses: []
	},
	{
		name: 'Tiefling',
		speed: 30,
		weaponProficiencies: [],
		toolProficiencies: [],
		languageProficiencies: [],
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
