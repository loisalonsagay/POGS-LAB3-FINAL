// auth.ts
import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

router.post('/login', async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    // Check if user exists in the database
    const user = await prisma.user.findFirst({
      where: {
        username: {
          equals: username,
        },
      },
    });

    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // If both username and password are valid, return user data
    res.status(200).json(user);
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/register', async (req: Request, res: Response) => {
  const { username, password, email } = req.body;

  try {
    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        username: {
          equals: username,
        },
      },
    });

    if (existingUser) {
      return res.status(409).json({ error: 'User already exists' });
    }

    // Create the new user
    const newUser = await prisma.user.create({
      data: {
        username,
        password,
        email,
      },
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error during user registration:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
