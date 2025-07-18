import mongoose from 'mongoose';

const adminUserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ['Super Admin', 'Content Manager', 'Booking Agent', 'Support Admin', 'Developer'], default: 'Support Admin' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('AdminUser', adminUserSchema); 