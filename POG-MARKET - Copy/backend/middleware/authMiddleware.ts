import { Request, Response, NextFunction } from 'express';

// Middleware to check user authentication
export async function authenticate(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: 'Authorization header missing' });
  }

  const token = authorization.split(' ')[1];

  try {
    if (token === 'validtoken123') {
      return next();
    } else {
      return res.status(401).json({ error: 'Invalid token' });
    }
  } catch (error) {
    console.error('Error during authentication:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
