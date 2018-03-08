const mongoose = require('mongoose');
const { Schema } = mongoose;
const userSchema = new Schema({
	googleId: String,
	displayName: String,
	bio: { type: String, default: "" },
});

mongoose.model('User', userSchema);
