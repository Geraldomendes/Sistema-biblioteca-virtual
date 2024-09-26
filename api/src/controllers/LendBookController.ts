import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export class LendBookController {
  async lendBook(req: Request, res: Response) {
    const { bookId, userId } = req.body;
    console.log(bookId, userId)

    const book = await prisma.book.findUnique({
      where: { id: bookId },
    });

    if (!book) {
      return res.status(400).json({ message: 'Book not found' });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    await prisma.lendBook.create({
      data: {
        bookId,
        userId,
        returnDate: new Date(new Date().setDate(new Date().getDate() + 15)),
      },
    });

    return res.json({ message: 'Book lent' });
  }

  async returnBook(req: Request, res: Response) {
    const { bookId, userId } = req.body;

    const lend = await prisma.lendBook.findFirst({
      where: {
        bookId,
        userId,
      },
    });

    if (!lend) {
      return res.status(400).json({ message: 'Book not lent' });
    }

    await prisma.lendBook.delete({
      where: {
        userId_bookId: {
          userId,
          bookId,
        },
      }
    });

    return res.json({ message: 'Book returned' });
  }

  async getLendsByUser(req: Request, res: Response) {
    const lends = await prisma.lendBook.findMany({
      where: { userId: req.userId },
      include: {
        book: true
      }
    });

    return res.json({ lends });
  }
}