export const _ABILITIES = [
	'Strength',
	'Dexterity',
	'Constitution',
	'Intelligence',
	'Wisdom',
	'Charisma'
];
export const _SKILLS = {
	Acrobatics: 'Dexterity',
	'Animal Handling': 'Wisdom',
	Arcana: 'Intelligence',
	Athletics: 'Strength',
	Deception: 'Charisma',
	History: 'Intelligence',
	Insight: 'Wisdom',
	Intimidation: 'Charisma',
	Investigation: 'Intelligence',
	Medicine: 'Wisdom',
	Nature: 'Intelligence',
	Perception: 'Wisdom',
	Performance: 'Charisma',
	Persuasion: 'Charisma',
	Religion: 'Intelligence',
	'Sleight of Hand': 'Dexterity',
	Stealth: 'Dexterity',
	Survival: 'Wisdom'
};

export const _ALIGNMENTS = [
	'Chaotic Evil',
	'Neutral Evil',
	'Lawful Evil',
	'Chaotic Neutral',
	'True Neutral',
	'Lawful Neutral',
	'Chaotic Good',
	'Neutral Good',
	'Lawful Good'
];

export const _EDITABLE_FIELDS = {
	Name: { type: 'text' },
	Level: { type: 'number', min: 1, max: 20 },
	Age: { type: 'number', min: 0 },
	Height: { type: 'text' },
	Weight: { type: 'text', min: 1 },
	Eyes: { type: 'text' },
	Skin: { type: 'text' },
	Hair: { type: 'text' },
};

export const _CALCULATED_FIELDS = [
	'Modifiers',
	'ProficiencyBonus',
	'SavingThrows',
	'Skills',
	'Initiative',
	'PassiveWisdom',
	'ArmorClass',
	'Speed',
	'Bonuses'
];

export const _CATEGORIES = {
	race: 'races',
	charClass: 'charClasses',
	background: 'backgrounds'
};

export const _PROFICIENCY_TYPES = [
	'Armor',
	'Weapon',
	'Tool',
	'Language'
];
