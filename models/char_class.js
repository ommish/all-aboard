const mongoose = require('mongoose');
const { Schema } = mongoose;
const bonus = require('./bonus');
const proficiency = require('./proficiency');
const equipment = require('./equipment');

const charClassSchema = new Schema({
	name: { type: String, required: true },
	hitDie: { type: Number, required: true },
	languageProficiencies: { type: [proficiency.proficiencySchema] },
	armorProficiencies: { type: [proficiency.proficiencySchema] },
	weaponProficiencies: { type: [proficiency.proficiencySchema] },
	toolProficiencies: { type: [proficiency.proficiencySchema] },
	saveProficiencies: { type: [proficiency.proficiencySchema] },
	skillProficiencies:  { type: [proficiency.proficiencySchema] },
	bonuses: { type: [bonus.bonusSchema] },
	equipment: {type: [equipment.equipmentSchema]},

});

const CharClass = mongoose.model('CharClass', charClassSchema);

module.exports = { charClassSchema };
