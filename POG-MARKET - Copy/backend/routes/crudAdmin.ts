import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = express.Router(); 

// Middleware to parse JSON bodies
router.use(express.json());

// Create a new pog
router.post('/', async (req, res) => {
  try {
    const newPog = await prisma.pog.create({
      data: req.body,
    });
    res.json(newPog);
  } catch (error) {
    console.error('Error creating pog:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Read all pogs
router.get('/', async (req, res) => {
  try {
    const pogs = await prisma.pog.findMany();
    res.json(pogs);
  } catch (error) {
    console.error('Error fetching pogs:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update a pog
router.put('/:id', async (req, res) => {
  try {
    const pogId = parseInt(req.params.id);
    const updatedPog = await prisma.pog.update({
      where: { id: pogId },
      data: req.body,
    });
    res.json(updatedPog);
  } catch (error) {
    console.error('Error updating pog:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete a pog
router.delete('/:id', async (req, res) => {
  try {
    const pogId = parseInt(req.params.id);
    await prisma.pog.delete({
      where: { id: pogId },
    });
    res.json({ message: 'Pog deleted successfully' });
  } catch (error) {
    console.error('Error deleting pog:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
