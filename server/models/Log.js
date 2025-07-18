import mongoose from 'mongoose';

const logSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  action: { type: String, required: true },
  user: { type: String, required: true },
  details: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Log', logSchema); 