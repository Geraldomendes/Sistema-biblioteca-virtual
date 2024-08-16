import dotenv from 'dotenv';
dotenv.config();

import { compare, hash } from 'bcrypt';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { prisma } from '../lib/prisma';

export class UserController {
  async signin(req: Request, res: Response) {
    const email = req.body.email as string;
    const password = req.body.password as string;

    const user = await prisma.user.findFirst({
      where: { email: { equals: email.toLowerCase() } },
    });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const comparePassword = await compare(password, user.password);

    if (!comparePassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
      expiresIn: '1h',
    });

    return res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        phone: user.phone,
        imageUrl: user.imageUrl,
        course: user.course,
        registration: user.registration,
        category: user.category,
        createdAt: user.createdAt,
      },
    });
  }

  async signup(req: Request, res: Response) {
    const { name, phone, email, registration, password } = req.body;

    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: { equals: email.toLowerCase() } },
          { registration: { equals: registration } },
        ],
      },
    });

    if (user) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const passwordHash = await hash(password, 8);

    await prisma.user.create({
      data: {
        name,
        phone,
        registration,
        email: email.toLowerCase(),
        password: passwordHash,
      },
    });

    return res.status(201).json({ message: 'User created' });
  }

  async profile(req: Request, res: Response) {
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        phone: user.phone,
        imageUrl: user.imageUrl,
        course: user.course,
        registration: user.registration,
        category: user.category,
        createdAt: user.createdAt,
      },
    });
  }
}
