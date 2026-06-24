import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';

const timingSafeCompare = (a: string, b: string): boolean => {
  const aBuf = Buffer.from(a, 'utf8');
  const bBuf = Buffer.from(b, 'utf8');
  if (aBuf.length !== bBuf.length) {
    crypto.timingSafeEqual(aBuf, aBuf);
    return false;
  }
  return crypto.timingSafeEqual(aBuf, bBuf);
};

export const checkPassword = (req: Request, res: Response, next: NextFunction): void => {
  const serverPassword = process.env.APP_PASSWORD;

  if (!serverPassword || serverPassword.trim() === '') {
    // No password configured, allow access
    return next();
  }

  const clientPassword = req.headers['x-app-password'];

  if (!clientPassword || Array.isArray(clientPassword)) {
    res.status(401).json({ error: 'Password required' });
    return;
  }

  if (timingSafeCompare(clientPassword, serverPassword)) {
    return next();
  }

  res.status(401).json({ error: 'Incorrect password' });
};
