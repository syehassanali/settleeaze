import mongoose from 'mongoose';

const PackageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: String },
  tagline: { type: String },
  features: { type: [String], default: [] },
  description: { type: String },
  type: { type: String, enum: ['Standard', 'Custom'], default: 'Standard' },
  visibility: { type: Boolean, default: true },
  priority: { type: Number, default: 0 },
  isDeleted: { type: Boolean, default: false },
  mostPopular: { type: Boolean, default: false },
}, { timestamps: true });

const Package = mongoose.model('Package', PackageSchema);
export default Package; 