const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true

  },
  email: {
    type: String,
    required: true
  },
  dob: {
    type: String,
    required: true,//cpassword
  },
  password: {
    type: String,
    required: true,
  },
  
}, {
  timestamps: true
});


module.exports = mongoose.model('UserRegistration', userSchema);



