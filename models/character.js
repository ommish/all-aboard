const mongoose = require('mongoose');
const { Schema } = mongoose;
const characterSchema = new Schema({
	_user: { type: Schema.Types.ObjectId, ref: 'User' },
	name: { type: String, default: '' },
	race: { type: String, default: '' },
	charClass: { type: String, default: '' },
	subclass: { type: String, default: '' },
	background: { type: String, default: '' },
	alignment: { type: String, default: '' },
	playerName: { type: String, default: '' },
	level: { type: Number, min: 1, max: 20 },
	inspiration: { type: Number, min: 0, max: 10, default: 0 },
	maxHealth: { type: Number, min: 0, max: 999, default: 0 },
	currentHealth: { type: Number, min: 0, max: 999, default: 0 },
	speed: { type: Number, min: 0, max: 999, default: 0 },
	armorClass: { type: Number, min: 0, max: 100, default: 0 },
	strength: { type: Number, min: 0, max: 20, default: 0 },
	dexterity: { type: Number, min: 0, max: 20, default: 0 },
	constitution: { type: Number, min: 0, max: 20, default: 0 },
	intelligence: { type: Number, min: 0, max: 20, default: 0 },
	wisdom: { type: Number, min: 0, max: 20, default: 0 },
	charisma: { type: Number, min: 0, max: 20, default: 0 },
	strengthSaveProficiency: { type: Boolean, default: false },
	dexteritySaveProficiency: { type: Boolean, default: false },
	constitutionSaveProficiency: { type: Boolean, default: false },
	intelligenceSaveProficiency: { type: Boolean, default: false },
	wisdomSaveProficiency: { type: Boolean, default: false },
	charismaSaveProficiency: { type: Boolean, default: false },
	acrobaticsProficiency: { type: Boolean, default: false },
	animalHandingProficiency: { type: Boolean, default: false },
	arcanaProficiency: { type: Boolean, default: false },
	athleticsProficiency: { type: Boolean, default: false },
	deceptionProficiency: { type: Boolean, default: false },
	historyProficiency: { type: Boolean, default: false },
	insightProficiency: { type: Boolean, default: false },
	intimidationProficiency: { type: Boolean, default: false },
	investigationProficiency: { type: Boolean, default: false },
	medicineProficiency: { type: Boolean, default: false },
	natureProficiency: { type: Boolean, default: false },
	perceptionProficiency: { type: Boolean, default: false },
	performanceProficiency: { type: Boolean, default: false },
	persuasionProficiency: { type: Boolean, default: false },
	religionProficiency: { type: Boolean, default: false },
	sleightOfHandProficiency: { type: Boolean, default: false },
	stealthProficiency: { type: Boolean, default: false },
	survivalProficiency: { type: Boolean, default: false },
	specialBonuses: { type: String, default: '[]' },
	otherProficienciesAndLanguages: { type: String, default: '' }
});

mongoose.model('Character', characterSchema);
