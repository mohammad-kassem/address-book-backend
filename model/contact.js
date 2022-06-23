const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  phone: {
    type: String,
    required: true,
    min: 6,
    max: 255,
    unique: true,
  },
  relationship: {
    type: String,
    required: true,
    min: 6,
    max: 255,
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