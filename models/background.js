const mongoose = require('mongoose');
const { Schema } = mongoose;
const bonus = require('./bonus');
const proficiency = require('./proficiency');
const equipment = require('./equipment');

const backgroundSchema = new Schema({
	name: { type: String, required: true },
	description: { type: String, default: '' },
	skillProficiencies: { type: [proficiency.proficiencySchema] },
	toolProficiencies: { type: [proficiency.proficiencySchema] },
	languageProficiencies: { type: [proficiency.proficiencySchema] },
	bonuses: { type: [bonus.bonusSchema] },
	gold: { type: Number, default: 0 },
	equipment: {type: [equipment.equipmentSchema]},
});

const Background = mongoose.model('Background', backgroundSchema);

module.exports = { backgroundSchema };
