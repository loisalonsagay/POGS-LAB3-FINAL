import express from 'express';
import { PrismaClient } from '@prisma/client';
import crudAdminrouter from '../backend/routes/crudAdmin'


const prisma = new PrismaClient();
const app = express();

// Mount the router
app.use('/pogs', crudAdminrouter);

// Middleware to parse JSON bodies
app.use(express.json());


app.get('/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.get('/users/pogs', async (req, res) => {
  try {
    const userPogs = await prisma.pog.findMany();
    res.json({ pogs: userPogs });
  } catch (error) {
    console.error('Error fetching user pogs:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST route to buy pogs
app.post('/users/buy-pogs', async (req, res) => {
  try {
    res.json({ message: 'Pogs bought successfully' });
  } catch (error) {
    console.error('Error buying pogs:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST route to sell pogs
app.post('/users/sell-pogs', async (req, res) => {
  try {
    res.json({ message: 'Pogs sold successfully' });
  } catch (error) {
    console.error('Error selling pogs:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.get('/pogs', async (req, res) => {
  try {
    const pogs = await prisma.pog.findMany();
    res.json(pogs);
  } catch (error) {
    console.error('Error fetching pogs:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.get('/ticker', async (req, res) => {
  try {
    const pogs = await prisma.pog.findMany();
    const pogNames = pogs.map(pog => pog.name);
    res.json(pogNames);
  } catch (error) {
    console.error('Error fetching pogs:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

export default app;
