const mongoose = require('mongoose');
const Background = mongoose.model('Background');

const backgrounds = [
	{
		name: 'Acolyte',
		description:
			'You have spent your life in the service of a temple to a specific god or pantheon of gods. You act as an intermediary between the realm of the holy and the mortal world, performing sacred rites and offering sacrifices in order to conduct worshipers into the presence of the divine. You are not necessarily a cleric—performing sacred rites is not the same thing as channeling divine power.',
		skillProficiencies: '["religion", "insight"]',
		toolProficiencies: '[]',
		languages: '["choice1", "choice2"]',
		gold: 15
	},
	{
		name: 'Charlatan',
		description: '',
		skillProficiencies: '["deception", "slightOfHand"]',
		toolProficiencies: '["Disguise Kit", "Forgery Kit"]',
		gold: 15
	},
	{
		name: 'Criminal',
		skillProficiencies: '["deception", "stealth"]',
		toolProficiencies: '["Gaming Set", "Thieve\'s Tools"]',
		gold: 15,
	},
	{
		name: 'Entertainer',
		skillProficiencies: '["acrobatics", "performance"]',
		toolProficiencies: '["Disguise Kit", "Musical Instrument"]',
		gold: 15
	},
	{
		name: 'Folk Hero',
		skillProficiencies: '["animalHandling", "survival"]',
		toolProficiencies: '["Artisan\'s Tools", "Land Vehicles"]',
		gold: 10
	},
	{
		name: 'Guild Artisan',
		skillProficiencies: '["insight", "persuasion"]',
		toolProficiencies: '["Artisan\'s Tools"]',
		languages: '["choice1"]',
		gold: 15
	},
	{
		name: 'Hermit',
		skillProficiencies: '["medicine", "religion"]',
		toolProficiencies: '["Herbalism Kit"]',
		languages: '["choice1"]',
		gold: 5
	},
	{
		name: 'Noble',
		skillProficiencies: '["history", "persuasion"]',
		toolProficiencies: '["Gaming Set"]',
		languages: '["choice1"]',
		gold: 25
	},
	{
		name: 'Outlander',
		skillProficiencies: '["athletics", "survival"]',
		toolProficiencies: '["Musical Instrument"]',
		languages: '["choice1"]',
		gold: 10
	},
	{
		name: 'Sage',
		skillProficiencies: '["arcana", "history"]',
		languages: '["choice1", "choice2"]',
		gold: 10
	},
	{
		name: 'Sailor',
		skillProficiencies: '["athletics", "perception"]',
		toolProficiencies: '["Navigator\'s Tools", "Water Vehicles"]',
		gold: 10
	},
	{
		name: 'Soldier',
		skillProficiencies: '["athletics", "intimidation"]',
		toolProficiencies: '["Gaming Set", "Land Vehicles"]',
		gold: 10
	},
	{
		name: 'Urchin',
		skillProficiencies: '["sleightOfHand", "stealth"]',
		toolProficiencies: '["Disguise Kit", "Thieve\'s Tools"]',
		gold: 10
	},
];

const seedBackground = async () => {
	await Background.remove();
	backgrounds.forEach(async (background) => {
		await new Background(background).save();
	});
};
seedBackground();
