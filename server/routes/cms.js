import express from 'express';
import CMS from '../models/CMS.js';

const router = express.Router();

// GET CMS content (first doc)
router.get('/', async (req, res) => {
  try {
    const cms = await CMS.findOne();
    res.json(cms || {});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// UPDATE CMS content
router.put('/:id', async (req, res) => {
  try {
    const cms = await CMS.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!cms) return res.status(404).json({ message: 'Not found' });
    res.json(cms);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router; 