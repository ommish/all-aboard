const mongoose = require('mongoose');
const { Schema } = mongoose;
const bonus = require('./bonus');
const proficiency = require('./proficiency');


const raceSchema = new Schema({
	name: { type: String, required: true },
	speed: { type: Number, required: true },
	languageProficiencies: { type: [proficiency.proficiencySchema] },
	armorProficiencies: { type: [proficiency.proficiencySchema] },
	weaponProficiencies: { type: [proficiency.proficiencySchema] },
	toolProficiencies: { type: [proficiency.proficiencySchema] },
	racialBonuses: { type: [bonus.bonusSchema] }
});

const Race = mongoose.model('Race', raceSchema);

module.exports = { raceSchema };
