import express from 'express';
import User from '../models/User.js';
import Booking from '../models/Booking.js';
import Inquiry from '../models/Inquiry.js';
import Package from '../models/Package.js';
import Payment from '../models/Payment.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const [totalUsers, bookings, inquiries, packages, payments] = await Promise.all([
      User.countDocuments(),
      Booking.countDocuments(),
      Inquiry.countDocuments(),
      Package.countDocuments(),
      Payment.find()
    ]);
    const revenue = payments.reduce((sum, p) => sum + (p.status === 'Completed' ? p.amount : 0), 0);
    // For demo, activeUsers = totalUsers * 0.3, customPackages = packages
    res.json({
      totalUsers,
      activeUsers: Math.floor(totalUsers * 0.3),
      customPackages: packages,
      bookings,
      inquiries,
      revenue
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router; 