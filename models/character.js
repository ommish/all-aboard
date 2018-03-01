const mongoose = require('mongoose');
const { Schema } = mongoose;
const armor = require('./armor');
const bonus = require('./bonus');

const characterSchema = new Schema({
	name: { type: String, default: '' },
	_user: { type: Schema.Types.ObjectId, ref: 'User' },
	armor: { type: armor.armorSchema },
	bonuses: { type: [bonus.bonusSchema] },
	race: { type: Schema.Types.ObjectId, ref: 'Race' },
	charClass: { type: String, default: '' },
	subclass: { type: String, default: '' },
	background: { type: String, default: '' },
	alignment: {
		type: String,
		default: '',
		enum: [
			'',
			'Chaotic Evil',
			'Neutral Evil',
			'Lawful Evil',
			'Chaotic Neutral',
			'True Neutral',
			'Lawful Neutral',
			'Chaotic Good',
			'Neutral Good',
			'Lawful Good'
		]
	},
	playerName: { type: String, default: '' },
	shielded: { type: Boolean, default: false },
	level: { type: Number, min: 1, max: 20, default: 1 },
	inspiration: { type: Number, min: 0, max: 10, default: 0 },
	maxHealth: { type: Number, min: 0, max: 999, default: 0 },
	currentHealth: { type: Number, min: 0, max: 999, default: 0 },
	speed: { type: Number, min: 0, max: 999, default: 0 },
	armorClass: { type: Number, min: 0, max: 100, default: 0 },
	strength: { type: Number, min: 0, max: 50, default: 0 },
	dexterity: { type: Number, min: 0, max: 50, default: 0 },
	constitution: { type: Number, min: 0, max: 50, default: 0 },
	intelligence: { type: Number, min: 0, max: 50, default: 0 },
	wisdom: { type: Number, min: 0, max: 50, default: 0 },
	charisma: { type: Number, min: 0, max: 50, default: 0 },
	strengthSaveProficiency: { type: Boolean, default: false },
	dexteritySaveProficiency: { type: Boolean, default: false },
	constitutionSaveProficiency: { type: Boolean, default: false },
	intelligenceSaveProficiency: { type: Boolean, default: false },
	wisdomSaveProficiency: { type: Boolean, default: false },
	charismaSaveProficiency: { type: Boolean, default: false },
	acrobaticsProficiency: { type: Boolean, default: false },
	animalHandlingProficiency: { type: Boolean, default: false },
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
	platinum: { type: Number, default: 0 },
	gold: { type: Number, default: 0 },
	silver: { type: Number, default: 0 },
	copper: { type: Number, default: 0 },
	age: Number,
	height: Number,
	weight: Number,
	eyes: {type: String, default: ''},
	skin: {type: String, default: ''},
	hair: {type: String, default: ''},
	backstory: {type: String, default: ''},
});

mongoose.model('Character', characterSchema);
