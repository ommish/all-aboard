const mongoose = require('mongoose');
const User = mongoose.model('User');
const Character = mongoose.model('Character');

module.exports = {
  get: async (req, res) => {
    const user = await User.findById(req.params.userId);
    if (user) {
      const characters = await Character.where('_user', user._id);
      res.send(characters);
    } else {
      res.status(404).send({ error: 'No such user exists' });
    }
  }
}
