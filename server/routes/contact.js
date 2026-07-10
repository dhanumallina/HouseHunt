import express from 'express';
import { Contact } from '../models/Contact.js';

const router = express.Router();

// Send contact message
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, message, propertyId, landlordId } = req.body;

    const contact = new Contact({
      name,
      email,
      phone,
      message,
      propertyId,
      landlordId,
      tenantId: req.userId,
    });

    await contact.save();
    res.json({ message: 'Message sent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get messages (for landlords)
router.get('/', async (req, res) => {
  try {
    const messages = await Contact.find({ landlordId: req.userId })
      .populate('propertyId', 'title')
      .populate('tenantId', 'name email phone');

    res.json({ messages });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
