const mongoose = require('mongoose');
const { Schema } = mongoose;
const equipmentSchema = new Schema({
	name: { type: String, required: true},
	weight: { type: Number, default: 0 },
	source: { type: String, default: ''},
	description: { type: String, default: ''},
});

const Equipment = mongoose.model('Equipment', equipmentSchema);

module.exports = { equipmentSchema };
