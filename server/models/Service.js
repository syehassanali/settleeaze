import mongoose from 'mongoose';

const ServiceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  details: { type: String },
  price: { type: String },
  imageUrl: { type: String },
  category: { type: String },
  visibility: { type: String, enum: ['Published', 'Hidden'], default: 'Published' },
  isDeleted: { type: Boolean, default: false },
  features: { type: [String], default: [] },
}, {
  timestamps: true
});

const Service = mongoose.model('Service', ServiceSchema);
export default Service; 