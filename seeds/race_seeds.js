const mongoose = require('mongoose');
const Race = mongoose.model('Race');

const darkVision = (source) => {
	return {
		name: 'Darkvision',
		description:
			'Accustomed to life underground, you have superior vision in dark and dim Conditions. You can see in dim light within 60 feet of you as if it were bright light, and in Darkness as if it were dim light. You can’t discern color in Darkness, only shades of gray.',
		field: '',
		bonusAmount: 0,
		source
	};
};

const scoreIncrease = (field, bonusAmount, source) => {
	return {
		name: 'Ability Score Increase',
		description: `Your ${field} score increases by ${bonusAmount}`,
		source
	};
};

const noIncrease = (name, description, source) => {
	return {
		name,
		description,
		source
	};
};

const lang = (name, source) => {
	return {
		name,
		source
	};
};

const races = [
	{
		name: 'Hill Dwarf',
		speed: 25,
		armorProficiencies: [],
		weaponProficiencies: [],
		toolProficiencies: [
			{
				name: "Smith's Tools/Brewer's Supplies/Mason's Tools",
				source: 'Hill Dwarf'
			}
		],
		languageProficiencies: [
			{ name: 'Common', source: 'Hill Dwarf' },
			{ name: 'Dwarvish', source: 'Hill Dwarf' }
		],
		bonuses: [
			darkVision('Hill Dwarf'),
			{
				name: 'Dwarven Resilience',
				source: 'Hill Dwarf',
				description:
					'You have advantage on saving throws against poison, and you have Resistance against poison damage.',
				field: '',
				bonusAmount: 0
			},
			scoreIncrease('Constitution', 2, 'Hill Dwarf'),
			{
				name: 'Stonecunning',
				source: 'Hill Dwarf',
				description:
					'Whenever you make an Intelligence (History) check related to the origin of stonework, you are considered proficient in the History skill and add double your proficiency bonus to the check, instead of your normal proficiency bonus.',
				field: '',
				bonusAmount: 0
			},
			noIncrease(
				'Dwarven Toughness',
				'Your hit point maximum increases by 1, and it increases by 1 every time you gain a level.',
				'Hill Dwarf'
			)
		]
	},
	{
		name: 'Mountain Dwarf',
		speed: 25,
		armorProficiencies: [
			{ name: 'Light Armor', source: 'Mountain Dwarf' },
			{ name: 'Medium Armor', source: 'Mountain Dwarf' }
		],
		weaponProficiencies: [],
		toolProficiencies: [
			{
				name: "Smith's Tools/Brewer's Supplies/Mason's Tools",
				source: 'Mountain Dwarf'
			}
		],
		languageProficiencies: [
			{ name: 'Common', source: 'Mountain Dwarf' },
			{ name: 'Dwarvish', source: 'Mountain Dwarf' }
		],
		bonuses: [
			darkVision('Mountain Dwarf'),
			{
				name: 'Dwarven Resilience',
				source: 'Mountain Dwarf',
				description:
					'You have advantage on saving throws against poison, and you have Resistance against poison damage.',
				field: '',
				bonusAmount: 0
			},
			{
				name: 'Stonecunning',
				source: 'Hill Dwarf',
				description:
					'Whenever you make an Intelligence (History) check related to the origin of stonework, you are considered proficient in the History skill and add double your proficiency bonus to the check, instead of your normal proficiency bonus.',
				field: '',
				bonusAmount: 0
			},
			scoreIncrease('Constitution', 2, 'Mountain Dwarf')
		]
	},
	{
		name: 'High Elf',
		speed: 30,
		armorProficiencies: [],
		weaponProficiencies: [],
		toolProficiencies: [],
		languageProficiencies: [
			lang('Common', 'High Elf'),
			lang('Elvish', 'High Elf'),
			lang('Choose One', 'High Elf')
		],
		skillProficiencies: [{ name: 'perception', source: 'High Elf' }],
		bonuses: [
			scoreIncrease('Dexterity', 2, 'High Elf'),
			darkVision('High Elf'),
			noIncrease(
				'Fey Ancestry',
				'You have advantage on saving throws against being Charmed, and magic can’t put you to sleep.',
				'High Elf'
			),
			noIncrease(
				'Trance',
				'Elves don’t need to sleep. Instead, they meditate deeply, remaining semiconscious, for 4 hours a day. (The Common word for such meditation is “trance.”) While meditating, you can dream after a fashion; such dreams are actually mental exercises that have become reflexive through years of practice. After Resting in this way, you gain the same benefit that a human does from 8 hours of sleep.',
				'High Elf'
			),
			scoreIncrease('Intelligence', 1, 'High Elf')
		]
	},
	{
		name: 'Dark Elf',
		speed: 30,
		armorProficiencies: [],
		weaponProficiencies: [],
		toolProficiencies: [],
		languageProficiencies: [
			lang('Common', 'Dark Elf'),
			lang('Elvish', 'Dark Elf')
		],
		skillProficiencies: [{ name: 'perception', source: 'Dark Elf' }],
		bonuses: [
			scoreIncrease('Dexterity', 2, 'Dark Elf'),
			darkVision('Dark Elf'),
			noIncrease(
				'Fey Ancestry',
				'You have advantage on saving throws against being Charmed, and magic can’t put you to sleep.',
				'Dark Elf'
			),
			noIncrease(
				'Trance',
				'Elves don’t need to sleep. Instead, they meditate deeply, remaining semiconscious, for 4 hours a day. (The Common word for such meditation is “trance.”) While meditating, you can dream after a fashion; such dreams are actually mental exercises that have become reflexive through years of practice. After Resting in this way, you gain the same benefit that a human does from 8 hours of sleep.',
				'Dark Elf'
			),
			scoreIncrease('Charisma', 1, 'Dark Elf'),
			noIncrease(
				'Superior Darkvision',
				'Your darkvision has a radius of 120 feet.',
				'Dark Elf'
			)
		]
	},
	{
		name: 'Wood Elf',
		speed: 35,
		armorProficiencies: [],
		weaponProficiencies: [],
		toolProficiencies: [],
		languageProficiencies: [
			lang('Common', 'Wood Elf'),
			lang('Elvish', 'Wood Elf')
		],
		skillProficiencies: [{ name: 'perception', source: 'Wood Elf' }],
		bonuses: [
			scoreIncrease('Dexterity', 2, 'Wood Elf'),
			darkVision('Wood Elf'),
			noIncrease(
				'Fey Ancestry',
				'You have advantage on saving throws against being Charmed, and magic can’t put you to sleep.',
				'Wood Elf'
			),
			noIncrease(
				'Trance',
				'Elves don’t need to sleep. Instead, they meditate deeply, remaining semiconscious, for 4 hours a day. (The Common word for such meditation is “trance.”) While meditating, you can dream after a fashion; such dreams are actually mental exercises that have become reflexive through years of practice. After Resting in this way, you gain the same benefit that a human does from 8 hours of sleep.',
				'Wood Elf'
			),
			scoreIncrease('Wisdom', 1, 'Wood Elf'),
			noIncrease(
				'Mask of the Wild',
				'You can attempt to hide even when you are only lightly obscured by foliage, heavy rain, falling snow , mist, and other natural phenomena',
				'Wood Elf'
			)
		]
	},
	{
		name: 'Lightfoot Halfling',
		speed: 25,
		armorProficiencies: [],
		weaponProficiencies: [],
		toolProficiencies: [],
		languageProficiencies: [
			lang('Common', 'Lightfoot Halfling'),
			lang('Halfling', 'Lightfoot Halfling')
		],
		bonuses: [
			scoreIncrease('Dexterity', 2, 'Lightfoot Halfling'),
			noIncrease(
				'Lucky',
				'When you roll a 1 on the d20 for an Attack roll, ability check, or saving throw, you can reroll the die and must use the new roll.',
				'Lightfoot Halfling'
			),
			noIncrease(
				'Brave',
				'You have advantage on saving throws against being Frightened.',
				'Lightfoot Halfling'
			),
			noIncrease(
				'Halfling Nimbleness',
				'You can move through the space of any creature that is of a size larger than yours.',
				'Lightfoot Halfling'
			),
			scoreIncrease('Charisma', 1, 'Lightfoot Halfling'),
			noIncrease(
				'Naturally Stealthy',
				'You can attempt to hide even when you are obscured only by a creature that is at least one size larger than you.',
				'Lightfoot Halfling'
			)
		]
	},
	{
		name: 'Stout Halfling',
		speed: 25,
		armorProficiencies: [],
		weaponProficiencies: [],
		toolProficiencies: [],
		languageProficiencies: [
			lang('Common', 'Stout Halfling'),
			lang('Halfling', 'Stout Halfling')
		],
		bonuses: [
			scoreIncrease('Dexterity', 2, 'Stout Halfling'),
			noIncrease(
				'Lucky',
				'When you roll a 1 on the d20 for an Attack roll, ability check, or saving throw, you can reroll the die and must use the new roll.',
				'Stout Halfling'
			),
			noIncrease(
				'Brave',
				'You have advantage on saving throws against being Frightened.',
				'Stout Halfling'
			),
			noIncrease(
				'Halfling Nimbleness',
				'You can move through the space of any creature that is of a size larger than yours.',
				'Stout Halfling'
			),
			scoreIncrease('Constitution', 1, 'Stout Halfling'),
			noIncrease(
				'Stout Resilience',
				'You have advantage on saving throws against poison, and you have Resistance against poison damage.',
				'Stout Halfling'
			)
		]
	},
	{
		name: 'Human',
		speed: 30,
		armorProficiencies: [],
		weaponProficiencies: [],
		toolProficiencies: [],
		languageProficiencies: [
			lang('Common', 'Human'),
			lang('Choose One', 'Human')
		],
		bonuses: [
			{
				name: 'Ability Score Increase',
				description: 'Your Ability Scores each increase by 1',
				source: 'Human'
			}
		]
	},
	{
		name: 'Dragonborn',
		speed: 30,
		armorProficiencies: [],
		weaponProficiencies: [],
		toolProficiencies: [],
		languageProficiencies: [
			lang('Common', 'Dragonborn'),
			lang('Draconic', 'Dragonborn')
		],
		bonuses: [
			scoreIncrease('Strength', 2, 'Dragonborn'),
			scoreIncrease('Charisma', 1, 'Dragonborn'),
			noIncrease(
				'Draconic Ancestry',
				'You have draconic ancestry. Choose one type of dragon from the Draconic Ancestry table. Your breath weapon and damage Resistance are determined by the dragon type.',
				'Dragonborn'
			),
			noIncrease(
				'Damage Resistance',
				'You have Resistance to the damage type associated with your draconic ancestry.',
				'Dragonborn'
			)
		]
	},
	{
		name: 'Forest Gnome',
		speed: 25,
		armorProficiencies: [],
		weaponProficiencies: [],
		toolProficiencies: [],
		languageProficiencies: [
			lang('Common', 'Forest Gnome'),
			lang('Gnomish', 'Forest Gnome')
		],
		bonuses: [
			scoreIncrease('Intelligence', 2, 'Forest Gnome'),
			darkVision('Forest Gnome'),
			noIncrease(
				'Gnome Cunning',
				'You have advantage on all Intelligence, Wisdom, and Charisma saving throws against magic.',
				'Forest Gnome'
			),
			scoreIncrease('Dexterity', 1, 'Forest Gnome'),
			noIncrease('Natural Illusionist', '', 'Forest Gnome')
		]
	},
	{
		name: 'Rock Gnome',
		speed: 25,
		armorProficiencies: [],
		weaponProficiencies: [],
		toolProficiencies: [{ name: "Artisan's Tools", source: 'Rock Gnome' }],
		languageProficiencies: [
			lang('Common', 'Rock Gnome'),
			lang('Gnomish', 'Rock Gnome')
		],
		bonuses: [
			scoreIncrease('Intelligence', 2, 'Rock Gnome'),
			darkVision('Rock Gnome'),
			noIncrease(
				'Gnome Cunning',
				'You have advantage on all Intelligence, Wisdom, and Charisma saving throws against magic.',
				'Rock Gnome'
			),
			scoreIncrease('Constitution', 1, 'Rock Gnome'),
			noIncrease(
				"Artificer's Lore",
				'Whenever you make an Intelligence (History) check related to Magic Items, alchemical Objects, or technological devices, you can add twice your proficiency bonus, instead of any proficiency bonus you normally apply.',
				'Rock Gnome'
			),
			noIncrease('Tinkerer', '', 'Rock Gnome')
		]
	},
	{
		name: 'Half-Elf',
		speed: 30,
		armorProficiencies: [],
		weaponProficiencies: [],
		toolProficiencies: [],
		languageProficiencies: [
			lang('Common', 'Half-Elf'),
			lang('Elvish', 'Half-Elf'),
			lang('Choose One', 'Half-Elf')
		],
		bonuses: [
			scoreIncrease('Charisma', 2, 'Half-Elf'),
			noIncrease(
				'Ability Score Increase',
				'Choose two other Ability Scores of your choice to increase by 1.',
				'Half-Elf'
			),
			darkVision('Half-Elf'),
			noIncrease(
				'Fey Ancestry',
				'You have advantage on saving throws against being Charmed, and magic can’t put you to sleep.',
				'Half-Elf'
			),
			noIncrease(
				'Skill Versatility',
				'You gain proficiency in two skills of your choice.',
				'Half-Elf'
			)
		]
	},
	{
		name: 'Half-Orc',
		speed: 30,
		armorProficiencies: [],
		weaponProficiencies: [],
		toolProficiencies: [],
		languageProficiencies: [
			lang('Common', 'Half-Orc'),
			lang('Orc', 'Half-Orc')
		],
		bonuses: [
			scoreIncrease('Strength', 2, 'Half-Orc'),
			scoreIncrease('Constitution', 1, 'Half-Orc'),
			darkVision('Half-Orc'),
			noIncrease(
				'Menacing',
				'You gain proficiency in the Intimidation skill.',
				'Half-Orc'
			),
			noIncrease(
				'Relentless Endurance',
				'When you are reduced to 0 hit points but not killed outright, you can drop to 1 hit point instead. You can’t use this feature again until you finish a Long Rest.',
				'Half-Orc'
			),
			noIncrease(
				'Savage Attack',
				'When you score a critical hit with a melee weapon Attack, you can roll one of the weapon’s damage dice one additional time and add it to the extra damage of the critical hit.',
				'Half-Orc'
			)
		]
	},
	{
		name: 'Tiefling',
		speed: 30,
		armorProficiencies: [],
		weaponProficiencies: [],
		toolProficiencies: [],
		languageProficiencies: [lang('Common', 'Tiefling'), lang('Infernal', 'Tiefling')],
		bonuses: [
			scoreIncrease('Intelligence', 1, 'Tiefling'),
			scoreIncrease('Charisma', 2, 'Tiefling'),
			darkVision('Tiefling'),
			noIncrease('Hellish Resistance', 'You have Resistance to fire damage', 'Tiefling'),
		]
	}
];

const seedRace = async () => {
	await Race.remove();
	races.forEach(async (race) => {
		await new Race(race).save();
	});
};
seedRace();
