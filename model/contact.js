const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 6,
    maxLength: 255,
  },
  phone: {
    type: String,
    required: true,
    minLength: 6,
    maxLength: 255,
    unique: true,
  },
  relationship: {
    type: String,
    required: true,
    minLength: 6,
    maxLength: 255,
  },
  email: {
    type: String,
    required: true,
    minLength: 6,
    maxLength: 255,
  },
  location: {
    type: [Number],
    required: true,
  },

  //many to one
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
});

module.exports = mongoose.model('Contact', contactSchema);