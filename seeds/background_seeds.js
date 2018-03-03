const mongoose = require('mongoose');
const Background = mongoose.model('Background');

const backgrounds = [
	{
		name: 'Acolyte',
		description:
			'You have spent your life in the service of a temple to a specific god or pantheon of gods. You act as an intermediary between the realm of the holy and the mortal world, performing sacred rites and offering sacrifices in order to conduct worshipers into the presence of the divine. You are not necessarily a cleric—performing sacred rites is not the same thing as channeling divine power.',
		skillProficiencies: [{ name: 'religion' }, { name: 'insight' }],
		toolProficiencies: [],
		languages: [{ name: 'choice1' }, { name: 'choice2' }],
		gold: 15
	},
	{
		name: 'Charlatan',
		description: '',
		skillProficiencies: [{ name: 'deception' }, { name: 'slightOfHand' }],
		toolProficiencies: [{ name: 'Disguise Kit' }, { name: 'Forgery Kit' }],
		gold: 15
	},
	{
		name: 'Criminal',
		skillProficiencies: [{ name: 'deception' }, { name: 'stealth' }],
		toolProficiencies: [{ name: 'Gaming Set' }, { name: "Thieve's Tools" }],
		gold: 15
	},
	{
		name: 'Entertainer',
		skillProficiencies: [{ name: 'acrobatics' }, { name: 'performance' }],
		toolProficiencies: [
			{ name: 'Disguise Kit' },
			{ name: 'Musical Instrument' }
		],
		gold: 15
	},
	{
		name: 'Folk Hero',
		skillProficiencies: [{ name: 'animalHandling' }, { name: 'survival' }],
		toolProficiencies: [{ name: "Artisan's Tools" }, { name: 'Land Vehicles' }],
		gold: 10
	},
	{
		name: 'Guild Artisan',
		skillProficiencies: [{ name: 'insight' }, { name: 'persuasion' }],
		toolProficiencies: [{ name: "Artisan's Tools" }],
		languages: [{ name: 'choice1' }],
		gold: 15
	},
	{
		name: 'Hermit',
		skillProficiencies: [{ name: 'medicine' }, { name: 'religion' }],
		toolProficiencies: [{ name: 'Herbalism Kit' }],
		languages: [{ name: 'choice1' }],
		gold: 5
	},
	{
		name: 'Noble',
		skillProficiencies: [{ name: 'history' }, { name: 'persuasion' }],
		toolProficiencies: [{ name: 'Gaming Set' }],
		languages: [{ name: 'choice1' }],
		gold: 25
	},
	{
		name: 'Outlander',
		skillProficiencies: [{ name: 'athletics' }, { name: 'survival' }],
		toolProficiencies: [{ name: 'Musical Instrument' }],
		languages: [{ name: 'choice1' }],
		gold: 10
	},
	{
		name: 'Sage',
		skillProficiencies: [{ name: 'arcana' }, { name: 'history' }],
		languages: [{ name: 'choice1' }, { name: 'choice2' }],
		gold: 10
	},
	{
		name: 'Sailor',
		skillProficiencies: [{ name: 'athletics' }, { name: 'perception' }],
		toolProficiencies: [
			{ name: "Navigator's Tools" },
			{ name: 'Water Vehicles' }
		],
		gold: 10
	},
	{
		name: 'Soldier',
		skillProficiencies: [{ name: 'athletics' }, { name: 'intimidation' }],
		toolProficiencies: [{ name: 'Gaming Set' }, { name: 'Land Vehicles' }],
		gold: 10
	},
	{
		name: 'Urchin',
		skillProficiencies: [{ name: 'sleightOfHand' }, { name: 'stealth' }],
		toolProficiencies: [{ name: 'Disguise Kit' }, { name: "Thieve's Tools" }],
		gold: 10
	}
];

const seedBackground = async () => {
	await Background.remove();
	backgrounds.forEach(async (background) => {
		await new Background(background).save();
	});
};
seedBackground();
