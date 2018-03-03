const mongoose = require('mongoose');
const { Schema } = mongoose;
const proficiencySchema = new Schema({
	name: { type: String, default: '' },
});

const Proficiency = mongoose.model('Proficiency', proficiencySchema);

module.exports = { proficiencySchema };
