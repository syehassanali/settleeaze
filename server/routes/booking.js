import express from 'express';
const router = express.Router();
import Booking from '../models/Booking.js';
import mongoose from 'mongoose';

// Helper to generate unique bookingId
function generateBookingId() {
  return 'BOOK' + Math.floor(100000 + Math.random() * 900000);
}

// POST /api/booking - Create a new booking
router.post('/', async (req, res) => {
  try {
    const { userId, userName, email, packageId, packageName, bookingDate, preferredDate, notes } = req.body;
    if (!userId || !userName || !email || !packageId || !packageName || !bookingDate || !preferredDate) {
      return res.status(400).json({ success: false, message: 'Missing required fields.' });
    }
    const bookingId = generateBookingId();
    const booking = new Booking({
      bookingId,
      userId,
      userName,
      email,
      packageId,
      packageName,
      bookingDate,
      preferredDate,
      notes
    });
    await booking.save();
    res.json({ success: true, bookingId });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/booking/user/:userId - Get bookings for a user
router.get('/user/:userId', async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.json({ success: true, bookings });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/booking - Admin: Get all bookings
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json({ success: true, bookings });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// PATCH /api/booking/:id - Admin: Update booking status
router.patch('/:id', async (req, res) => {
  try {
    const { status } = req.body;
    if (!['Pending', 'Confirmed', 'Completed'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status.' });
    }
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!booking) return res.status(404).json({ success: false, message: 'Booking not found.' });
    res.json({ success: true, booking });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
