import express from 'express';
import Service from '../models/Service.js';
import multer from 'multer';
import path from 'path';

const router = express.Router();

// Multer setup for local uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.resolve(), 'uploads'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// GET /api/services - List with filters, search, pagination for ADMIN
router.get('/', async (req, res) => {
  try {
    const { search, category, visibility, page = 1, limit = 10 } = req.query;
    const query = { isDeleted: false };
    if (search) query.title = { $regex: search, $options: 'i' };
    if (category) query.category = category;
    if (visibility) query.visibility = visibility;
    const services = await Service.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));
    const total = await Service.countDocuments(query);
    res.json({ services, total });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/services - Create
router.post('/', async (req, res) => {
  try {
    const service = new Service(req.body);
    await service.save();
    res.status(201).json(service);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT /api/services/:id - Update
router.put('/:id', async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(service);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /api/services/:id - Soft delete
router.delete('/:id', async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, { isDeleted: true }, { new: true });
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// POST /api/services/:id/restore - Restore soft-deleted service
router.post('/:id/restore', async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, { isDeleted: false }, { new: true });
    res.json(service);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PATCH /api/services/:id/visibility - Toggle visibility
router.patch('/:id/visibility', async (req, res) => {
  try {
    const { visibility } = req.body;
    const service = await Service.findByIdAndUpdate(req.params.id, { visibility }, { new: true });
    res.json(service);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// POST /api/admin/services/upload - Image upload
router.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  // Return the file URL (assuming static serving from /uploads)
  const fileUrl = `/uploads/${req.file.filename}`;
  res.json({ url: fileUrl });
});

export default router; 