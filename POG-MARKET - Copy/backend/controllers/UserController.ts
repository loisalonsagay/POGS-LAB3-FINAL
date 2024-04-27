import { Request, Response } from 'express';
import UserService from '../services/UserService';

const UserController = {
  async getUserInfo(req: Request, res: Response) {
    try {
      if (!req.user || typeof req.user.id !== 'number') {
        return res.status(400).json({ message: 'Invalid user ID' });
      }

      const userInfo = await UserService.getUserInfo(req.user.id);
      res.json(userInfo);
    } catch (error) {
      console.error('Error fetching user information:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  async getUserPogs(req: Request, res: Response) {
    try {
      if (!req.user || typeof req.user.id !== 'number') {
        return res.status(400).json({ message: 'Invalid user ID' });
      }

      const userPogs = await UserService.getUserPogs(req.user.id);
      res.json(userPogs);
    } catch (error) {
      console.error('Error fetching user pogs:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  async buyPogs(req: Request, res: Response) {
    try {
      if (!req.user || typeof req.user.id !== 'number') {
        return res.status(400).json({ message: 'Invalid user ID' });
      }

      const { pogsToBuy } = req.body;
      await UserService.buyPogs(req.user.id, pogsToBuy);
      res.status(200).json({ message: 'Pogs bought successfully' });
    } catch (error) {
      console.error('Error buying pogs:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  async sellPogs(req: Request, res: Response) {
    try {
      if (!req.user || typeof req.user.id !== 'number') {
        return res.status(400).json({ message: 'Invalid user ID' });
      }

      const { pogsToSell } = req.body;
      await UserService.sellPogs(req.user.id, pogsToSell);
      res.status(200).json({ message: 'Pogs sold successfully' });
    } catch (error) {
      console.error('Error selling pogs:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};

export default UserController;
