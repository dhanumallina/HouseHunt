import express from 'express';
import { Property } from '../models/Property.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// Get all properties with filters
router.get('/', async (req, res) => {
  try {
    const { city, minPrice, maxPrice, bedrooms, limit = 12, owner } = req.query;
    let filter = {};

    if (city) filter.city = { $regex: city, $options: 'i' };
    if (minPrice || maxPrice) {
      filter.rent = {};
      if (minPrice) filter.rent.$gte = parseInt(minPrice);
      if (maxPrice) filter.rent.$lte = parseInt(maxPrice);
    }
    if (bedrooms) filter.bedrooms = { $gte: parseInt(bedrooms) };
    if (owner) filter.owner = owner;

    const properties = await Property.find(filter)
      .populate('owner', 'name email phone')
      .limit(parseInt(limit));

    res.json({ properties });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get property by ID
router.get('/:id', async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate(
      'owner',
      'name email phone'
    );

    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    res.json({ property });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create property (Landlord only)
router.post('/', verifyToken, async (req, res) => {
  try {
    if (req.userRole !== 'landlord') {
      return res.status(403).json({ message: 'Only landlords can create properties' });
    }

    const property = new Property({
      ...req.body,
      owner: req.userId,
    });

    await property.save();
    await property.populate('owner', 'name email phone');

    res.json({ property });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update property (Landlord only)
router.put('/:id', verifyToken, async (req, res) => {
  try {
    let property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    if (property.owner.toString() !== req.userId && req.userRole !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    property = await Property.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate('owner', 'name email phone');

    res.json({ property });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete property (Landlord only)
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    if (property.owner.toString() !== req.userId && req.userRole !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await Property.findByIdAndDelete(req.params.id);

    res.json({ message: 'Property deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
