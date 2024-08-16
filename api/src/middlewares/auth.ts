import dotenv from 'dotenv';
dotenv.config();

import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

export const userAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(' ')[1] as string;
  try {
    jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
      if (err) {
        throw new Error('Unauthorized');
      }

      if (decoded) {
        req.userId = (decoded as JwtPayload).id;
      }

      return next();
    });
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
};
