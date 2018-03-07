const mongoose = require('mongoose');
const CharClass = mongoose.model('CharClass');

const bonus = (name, description, level, field, bonusAmount, source) => {
	return {
		name, description, level, field, bonusAmount, source
	}
}

const checkProf = (name, source, level) => {
	return {
		name,
		source,
		level,
	};
};



const charClasses = [
	{
		name: 'Barbarian',
		hitDie: 12,
		armorProficiencies: [
			checkProf('Light Armor', 'Barbarian', 1),
		],
		saveProficiencies: [
			checkProf('strength', 'Barbarian', 1),
			checkProf('constitution', 'Barbarian', 1),
		],
		bonuses: [
			bonus('Skill Proficiency', 'Choose two from Animal Handling, Athletics, Intimidation, Nature, Perception, and Survival', 1, '', 0, 'Barbarian'),
			bonus('Rage', 'In battle, you fight with primal ferocity. On Your Turn, you can enter a rage as a Bonus Action.', 1, '', 0, 'Barbarian'),
			bonus('UnArmored Defense', 'While you are not wearing any armor, your Armor Class equals 10 + your Dexterity modifier + your Constitution modifier. You can use a Shield and still gain this benefit.', 1, '', 0, 'Barbarian'),
			bonus('Danger Sense', "At 2nd level, you gain an uncanny sense of when things nearby aren't as they should be, giving you an edge when you dodge away from danger. You have advantage on Dexterity saving throws against effects that you can see, such as traps and Spells. To gain this benefit, you can't be Blinded, Deafened, or Incapacitated.", 2, '', 0, 'Barbarian'),
			bonus('Reckless Attack', 'Starting at 2nd level, you can throw aside all concern for defense to Attack with fierce desperation. When you make your first Attack on Your Turn, you can decide to Attack recklessly. Doing so gives you advantage on melee weapon Attack rolls using Strength during this turn, but Attack rolls against you have advantage until your next turn.', 2, '', 0, 'Barbarian'),
			bonus('Extra Attack', 'Beginning at 5th level, you can Attack twice, instead of once, whenever you take the Attack action on Your Turn.', 5, '', 0, 'Barbarian'),
			bonus('Fast Movement', "Starting at 5th level, your speed increases by 10 feet while you aren't wearing Heavy Armor.", 5, '', 0, 'Barbarian'),
			bonus('Feral Instinct', "By 7th level, your instincts are so honed that you have advantage on initiative rolls. Additionally, if you are surprised at the beginning of Combat and aren't Incapacitated, you can act normally on your first turn, but only if you enter your rage before doing anything else on that turn.", 7, '', 0, 'Barbarian'),
			bonus('Brutal Critical', 'Beginning at 9th level, you can roll one additional weapon damage die when determining the extra damage for a critical hit with a melee Attack. This increases to two additional dice at 13th level and three additional dice at 17th level.', 9, '', 0, 'Barbarian'),
		]
	},
	{
		name: 'Bard',
		hitDie: 8,
		saveProficiencies: [
			checkProf('dexterity', 'Bard', 1),
			checkProf('charisma', 'Bard', 1),
		],
		armorProficiencies: [
			checkProf('Light Armor', 'Bard', 1),
		],
		toolProficiencies: [
			checkProf('Musical Instrument (your choice)', 'Bard', 1),
			checkProf('Musical Instrument (your choice)', 'Bard', 1),
			checkProf('Musical Instrument (your choice)', 'Bard', 1),
		],
		bonuses: [
			bonus('Skill Proficiency', 'Choose any three', 1, '', 0, 'Bard'),
			bonus('Bardic Inspiration', 'You can inspire others through stirring words or music. To do so, you use a Bonus Action on Your Turn to choose one creature other than yourself within 60 feet of you who can hear you. That creature gains one Bardic Inspiration die, a d6.', 1, '', 0, 'Bard'),
			bonus('Jack of All Trades', "Starting at 2nd level, you can add half your proficiency bonus, rounded down, to any ability check you make that doesn't already include your proficiency bonus.", 2, '', 0, 'Bard'),
			bonus('Song of Rest', 'Beginning at 2nd level, you can use soothing music or oration to help revitalize your wounded allies during a Short Rest. If you or any friendly creatures who can hear your performance regain hit points by spending Hit Dice at the end of the Short Rest, each of those creatures regains an extra 1d6 hit points.', 2, '', 0, 'Bard'),
			bonus('Bard College', 'At 3rd level, you delve into the advanced techniques of a bard college of your choice, such as the College of Lore. Your choice grants you features at 3rd level and again at 6th and 14th level.', 3, '', 0, 'Bard'),
			bonus('Expertise', 'At 3rd level, choose two of your skill proficiencies. Your proficiency bonus is doubled for any ability check you make that uses either of the chosen proficiencies.', 3, '', 0, 'Bard'),
			bonus('Expertise', 'At 3rd level, choose two of your skill proficiencies. Your proficiency bonus is doubled for any ability check you make that uses either of the chosen proficiencies.', 3, '', 0, 'Bard'),
			bonus('Expertise', 'At 10th level, choose two of your skill proficiencies. Your proficiency bonus is doubled for any ability check you make that uses either of the chosen proficiencies.', 10, '', 0, 'Bard'),
			bonus('Expertise', 'At 10th level, choose two of your skill proficiencies. Your proficiency bonus is doubled for any ability check you make that uses either of the chosen proficiencies.', 10, '', 0, 'Bard'),
			bonus('Font of Inspiration', 'Beginning when you reach 5th level, you regain all of your expended uses of Bardic Inspiration when you finish a short or Long Rest.', 5, '', 0, 'Bard'),
		]
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
