const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  details: { type: String },
  price: { type: String }, // Can be string for 'Free' or price value
  imageUrl: { type: String },
  category: { type: String },
  visibility: { type: String, enum: ['Published', 'Hidden'], default: 'Published' },
  isDeleted: { type: Boolean, default: false },
}, {
  timestamps: true
});

module.exports = mongoose.model('Service', ServiceSchema); 