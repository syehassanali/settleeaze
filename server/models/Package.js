import mongoose from 'mongoose';

const packageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  services: [{ type: String, required: true }],
  mostPopular: { type: Boolean, default: false },
  sort: { type: Number, default: 0 },
  image: { type: String },
  description: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Package', packageSchema); 