import mongoose from 'mongoose';

const inquirySchema = new mongoose.Schema({
  type: { type: String, required: true },
  subject: { type: String, required: true },
  date: { type: Date, required: true },
  status: { type: String, enum: ['Unread', 'Read'], default: 'Unread' },
  message: { type: String, required: true },
  assigned: { type: String },
  note: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Inquiry', inquirySchema); 