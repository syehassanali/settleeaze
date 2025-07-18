import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String },
  price: { type: Number, required: true },
  image: { type: String },
  description: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Service', serviceSchema); 