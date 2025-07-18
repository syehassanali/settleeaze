import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  type: { type: String, required: true },
  message: { type: String, required: true },
  time: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Notification', notificationSchema); 