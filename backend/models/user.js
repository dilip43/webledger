const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Please enter your name!'] },
  email: { type: String, unique: true, required: [true, 'Please enter your email!'] },
  password: {
    type: String,
    required: [true, 'Please enter your password'],
    minLength: [4, 'Password should be greater than 4 characters'],
  },
  recipe: [
    {
      id: { type: Number },
      title: { type: String },
      image: { type: String },
    },
  ],
});

// hash password
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 12);
});

// compare password
UserSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
