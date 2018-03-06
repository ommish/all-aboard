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
		name: 'Hill Dwarf',
		speed: 25,
		armorProficiencies: [],
		weaponProficiencies: [],
		toolProficiencies: [],
		languageProficiencies: [{ name: 'Common', source: 'Hill Dwarf' }, { name: 'Dwarvish', source: 'Hill Dwarf' }],
		bonuses: [
			{
				name: 'Darkvision',
				source: 'Hill Dwarf',
				description:
					'Accustomed to life underground, you have superior vision in dark and dim Conditions. You can see in dim light within 60 feet of you as if it were bright light, and in Darkness as if it were dim light. You can’t discern color in Darkness, only shades of gray.',
				field: '',
				bonusAmount: 0
			},
			{
				name: 'Dwarven Resilience',
				source: 'Hill Dwarf',
				description:
					'You have advantage on saving throws against poison, and you have Resistance against poison damage.',
				field: '',
				bonusAmount: 0
			}
		]
	},
	{
		name: 'Mountain Dwarf',
		speed: 25,
		armorProficiencies: [{ name: 'Light Armor', source: 'Mountain Dwarf'}, { name: 'Medium Armor', source: 'Mountain Dwarf'}],
		weaponProficiencies: [],
		toolProficiencies: [],
		languageProficiencies: [{ name: 'Common', source: 'Mountain Dwarf' }, { name: 'Dwarvish', source: 'Mountain Dwarf' }],
		bonuses: [
			{
				name: 'Darkvision',
				source: 'Mountain Dwarf',
				description:
					'Accustomed to life underground, you have superior vision in dark and dim Conditions. You can see in dim light within 60 feet of you as if it were bright light, and in Darkness as if it were dim light. You can’t discern color in Darkness, only shades of gray.',
				field: '',
				bonusAmount: 0
			},
			{
				name: 'Dwarven Resilience',
				source: 'Mountain Dwarf',
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
		armorProficiencies: [],		
		weaponProficiencies: [],
		toolProficiencies: [],
		languageProficiencies: [],
		bonuses: []
	},
	{
		name: 'Halfling',
		speed: 25,
		armorProficiencies: [],		
		weaponProficiencies: [],
		toolProficiencies: [],
		languageProficiencies: [],
		bonuses: []
	},
	{
		name: 'Human',
		speed: 30,
		armorProficiencies: [],		
		weaponProficiencies: [],
		toolProficiencies: [],
		languageProficiencies: [],
		bonuses: []
	},
	{
		name: 'Dragonborn',
		speed: 30,
		armorProficiencies: [],		
		weaponProficiencies: [],
		toolProficiencies: [],
		languageProficiencies: [],
		bonuses: []
	},
	{
		name: 'Gnome',
		speed: 25,
		armorProficiencies: [],		
		weaponProficiencies: [],
		toolProficiencies: [],
		languageProficiencies: [],
		bonuses: []
	},
	{
		name: 'Half-Elf',
		speed: 30,
		armorProficiencies: [],		
		weaponProficiencies: [],
		toolProficiencies: [],
		languageProficiencies: [],
		bonuses: []
	},
	{
		name: 'Half-Orc',
		speed: 30,
		armorProficiencies: [],		
		weaponProficiencies: [],
		toolProficiencies: [],
		languageProficiencies: [],
		bonuses: []
	},
	{
		name: 'Tiefling',
		speed: 30,
		armorProficiencies: [],		
		weaponProficiencies: [],
		toolProficiencies: [],
		languageProficiencies: [],
		bonuses: []
	}
];

const seedRace = async () => {
	await Race.remove();
	races.forEach(async (race) => {
		await new Race(race).save();
	});
};
seedRace();
