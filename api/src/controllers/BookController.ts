import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export class BookController {
  fetchBooks = async(req: Request, res: Response) => {
    const books = await prisma.book.findMany();
    return res.json(books);
  }

  getBook = async(req: Request, res: Response) => {
    const { id } = req.params;

    const book = await prisma.book.findUnique({
      where: { id },
    });

    if (!book) {
      return res.status(400).json({ message: 'Book not found' });
    }

    return res.json({ book });
  }

  createBook = async(req: Request, res: Response) => {
    const { title, author, year, editor, category } = req.body;

    await prisma.book.create({
      data: {
        title,
        author,
        year,
        editor,
        category,
      },
    });

    return res.status(201).json({ message: 'Book created' });
  }

  updateBook = async(req: Request, res: Response) => {
    const { id } = req.params;
    const { title, author, year, editor, category } = req.body;

    await prisma.book.update({
      where: {
        id,
      },
      data: {
        title,
        author,
        year,
        editor,
        category,
      },
    });

    return res.json({ message: 'Book updated' });
  }

  deleteBook = async(req: Request, res: Response) => {
    const { id } = req.params;

    await prisma.book.delete({
      where: {
        id
      }
    });

    return res.json({ message: 'Book deleted' });
  }
} 