import express from 'express';
import BankingService from '../models/BankingService.js';

const router = express.Router();

// GET /api/banking - List with filters, search, pagination
router.get('/', async (req, res) => {
  try {
    const { search, serviceCategory, visibility, page = 1, limit = 20 } = req.query;
    const query = { isDeleted: false };
    if (search) query.title = { $regex: search, $options: 'i' };
    if (serviceCategory) query.serviceCategory = serviceCategory;
    if (visibility !== undefined) query.visibility = visibility === 'true';
    const services = await BankingService.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));
    const total = await BankingService.countDocuments(query);
    res.json({ services, total });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/banking - Create
router.post('/', async (req, res) => {
  try {
    const service = new BankingService(req.body);
    await service.save();
    res.status(201).json(service);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT /api/banking/:id - Update
router.put('/:id', async (req, res) => {
  try {
    const service = await BankingService.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(service);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /api/banking/:id - Soft delete
router.delete('/:id', async (req, res) => {
  try {
    await BankingService.findByIdAndUpdate(req.params.id, { isDeleted: true }, { new: true });
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// POST /api/banking/:id/restore - Restore soft-deleted service
router.post('/:id/restore', async (req, res) => {
  try {
    const service = await BankingService.findByIdAndUpdate(req.params.id, { isDeleted: false }, { new: true });
    res.json(service);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PATCH /api/banking/:id/visibility - Toggle visibility
router.patch('/:id/visibility', async (req, res) => {
  try {
    const { visibility } = req.body;
    const service = await BankingService.findByIdAndUpdate(req.params.id, { visibility }, { new: true });
    res.json(service);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router; 