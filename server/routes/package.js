const express = require('express');
const router = express.Router();
const Package = require('../models/Package');

// GET /api/packages - List with filters, search, pagination
router.get('/', async (req, res) => {
  try {
    const { search, type, visibility, page = 1, limit = 20 } = req.query;
    const query = { isDeleted: false };
    if (search) query.title = { $regex: search, $options: 'i' };
    if (type) query.type = type;
    if (visibility !== undefined) query.visibility = visibility === 'true';
    const packages = await Package.find(query)
      .sort({ priority: -1, createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));
    const total = await Package.countDocuments(query);
    res.json({ packages, total });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/packages - Create
router.post('/', async (req, res) => {
  try {
    const pkg = new Package(req.body);
    await pkg.save();
    res.status(201).json(pkg);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT /api/packages/:id - Update
router.put('/:id', async (req, res) => {
  try {
    const pkg = await Package.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(pkg);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /api/packages/:id - Soft delete
router.delete('/:id', async (req, res) => {
  try {
    await Package.findByIdAndUpdate(req.params.id, { isDeleted: true }, { new: true });
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// POST /api/packages/:id/restore - Restore soft-deleted package
router.post('/:id/restore', async (req, res) => {
  try {
    const pkg = await Package.findByIdAndUpdate(req.params.id, { isDeleted: false }, { new: true });
    res.json(pkg);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PATCH /api/packages/:id/visibility - Toggle visibility
router.patch('/:id/visibility', async (req, res) => {
  try {
    const { visibility } = req.body;
    const pkg = await Package.findByIdAndUpdate(req.params.id, { visibility }, { new: true });
    res.json(pkg);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PATCH /api/packages/:id/most-popular - Set/unset most popular
router.patch('/:id/most-popular', async (req, res) => {
  try {
    const { mostPopular } = req.body;
    const pkg = await Package.findByIdAndUpdate(req.params.id, { mostPopular }, { new: true });
    res.json(pkg);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router; 