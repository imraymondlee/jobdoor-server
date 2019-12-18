const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String,
  }
});

const User = mongoose.model('User', userSchema, 'users');

module.exports = User;
