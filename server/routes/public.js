import express from 'express';
import Service from '../models/Service.js';

const router = express.Router();

// GET /api/public/services - Get all published services
router.get('/services', async (req, res) => {
  try {
    const services = await Service.find({
      isDeleted: false,
      visibility: 'Published'
    }).sort({ createdAt: -1 });
    res.json({ services });
  } catch (err) {
    console.error('Error fetching public services:', err);
    res.status(500).json({ error: 'Failed to load services.' });
  }
});

export default router; 