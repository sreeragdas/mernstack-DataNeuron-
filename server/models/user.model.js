const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
 
  },
  name: {
    type: String,
    required: true,

    trim: true,

  },
  address: {
    type: String,
    required: true,
    unique: true,
    trim: true,
   
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 10
  },
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
