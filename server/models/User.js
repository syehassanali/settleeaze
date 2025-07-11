import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String }, // Not required for Google users
  googleId: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('User', userSchema); 