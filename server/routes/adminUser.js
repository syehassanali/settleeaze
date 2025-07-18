import express from 'express';
import AdminUser from '../models/AdminUser.js';

const router = express.Router();

// GET all admin users
router.get('/', async (req, res) => {
  try {
    const admins = await AdminUser.find().sort({ createdAt: -1 });
    res.json(admins);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET one admin user
router.get('/:id', async (req, res) => {
  try {
    const admin = await AdminUser.findById(req.params.id);
    if (!admin) return res.status(404).json({ message: 'Not found' });
    res.json(admin);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// CREATE admin user
router.post('/', async (req, res) => {
  try {
    const admin = new AdminUser(req.body);
    await admin.save();
    res.status(201).json(admin);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// UPDATE admin user
router.put('/:id', async (req, res) => {
  try {
    const admin = await AdminUser.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!admin) return res.status(404).json({ message: 'Not found' });
    res.json(admin);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE admin user
router.delete('/:id', async (req, res) => {
  try {
    const admin = await AdminUser.findByIdAndDelete(req.params.id);
    if (!admin) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router; 