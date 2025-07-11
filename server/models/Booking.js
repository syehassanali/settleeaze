import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  bookingId: { type: String, required: true, unique: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  userName: { type: String, required: true },
  email: { type: String, required: true },
  packageId: { type: String, required: true }, // TEMP: allow string for hardcoded packages
  packageName: { type: String, required: true },
  status: { type: String, enum: ['Pending', 'Confirmed', 'Completed'], default: 'Pending' },
  bookingDate: { type: Date, required: true },
  preferredDate: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
  notes: { type: String }
});

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking; 