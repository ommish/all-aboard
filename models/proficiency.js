const mongoose = require('mongoose');
const { Schema } = mongoose;
const proficiencySchema = new Schema({
	name: { type: String, default: '' },
	source: { type: String, default: ''},
	level: { type: Number, default: 1 },
});

const Proficiency = mongoose.model('Proficiency', proficiencySchema);

module.exports = { proficiencySchema };
