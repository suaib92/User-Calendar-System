const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  googleId: String,
  accessToken: String,
  refreshToken: String,
});

module.exports = mongoose.model('User', userSchema);
