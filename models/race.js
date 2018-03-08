const mongoose = require('mongoose');
const { Schema } = mongoose;
const bonus = require('./bonus');
const proficiency = require('./proficiency');
const equipment = require('./equipment');

const raceSchema = new Schema({
	name: { type: String, required: true },
	speed: { type: Number, required: true },
	languageProficiencies: { type: [proficiency.proficiencySchema] },
	armorProficiencies: { type: [proficiency.proficiencySchema] },
	weaponProficiencies: { type: [proficiency.proficiencySchema] },
	toolProficiencies: { type: [proficiency.proficiencySchema] },
	bonuses: { type: [bonus.bonusSchema] },
	equipment: {type: [equipment.equipmentSchema]},
});

const Race = mongoose.model('Race', raceSchema);

module.exports = { raceSchema };
