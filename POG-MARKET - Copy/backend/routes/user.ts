import express from 'express';
import { authenticate } from '../middleware/authMiddleware'; // Import your authentication middleware here

const router = express.Router();

// Route to fetch user information
router.get('/', authenticate, (req, res) => {
  try {
    // Check if req.user is defined
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Retrieve user information from database or any other source
    const user = {
      id: req.user.id,
      username: req.user.username,
      email: req.user.email,
      // Include any other user data you need
    };

    res.json(user); // Send user information as JSON response
  } catch (error) {
    console.error('Error fetching user information:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Additional routes for user-related actions can be added here

export default router;
