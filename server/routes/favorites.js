import express from 'express';
import { Favorite } from '../models/Favorite.js';
import { Property } from '../models/Property.js';

const router = express.Router();

// Get all favorites
router.get('/', async (req, res) => {
  try {
    const favorites = await Favorite.find({ userId: req.userId }).populate(
      'propertyId'
    );

    const properties = favorites.map((fav) => ({
      ...fav.propertyId.toObject(),
      isFavorite: true,
    }));

    res.json({ favorites: properties });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Add favorite
router.post('/:propertyId', async (req, res) => {
  try {
    let favorite = await Favorite.findOne({
      userId: req.userId,
      propertyId: req.params.propertyId,
    });

    if (favorite) {
      return res.status(400).json({ message: 'Already in favorites' });
    }

    favorite = new Favorite({
      userId: req.userId,
      propertyId: req.params.propertyId,
    });

    await favorite.save();
    res.json({ message: 'Added to favorites' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Remove favorite
router.delete('/:propertyId', async (req, res) => {
  try {
    await Favorite.findOneAndDelete({
      userId: req.userId,
      propertyId: req.params.propertyId,
    });

    res.json({ message: 'Removed from favorites' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
