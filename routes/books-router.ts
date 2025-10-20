import type { Request, Response } from "express";
import { Router } from "express";
import type { IBook } from "models/book.js";
import { Book } from "models/book.js";

export const booksRouter = Router();

// Get all books
booksRouter.get("/api/v1/books", async (_, res: Response) => {
  try {
    const books = await Book.find();
    res
      .status(200)
      .json({ message: "Books fetched successfully", data: books });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

// Update a book
booksRouter.put("/api/v1/books/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const updatedBook = await Book.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res
      .status(200)
      .json({ message: "Book updated successfully", data: updatedBook });
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
});

// Get a single book
booksRouter.get("/api/v1/books/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json({ message: "Book fetched successfully", data: book });
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
});

// Delete a single book
booksRouter.delete("/api/v1/books/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedBook = await Book.findByIdAndDelete(id);
    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
});

// Create a new book
booksRouter.post(
  "/api/v1/books",
  async (req: Request<{}, {}, IBook>, res: Response) => {
    const { author, isAvailable, publishedYear, title, genre } = req.body;

    try {
      const existingBook = await Book.findOne({ title, author });
      if (existingBook) {
        return res.status(409).json({ message: "This book already exists" });
      }

      const book = await Book.create({
        title,
        author,
        publishedYear,
        genre,
        isAvailable,
      });
      res
        .status(201)
        .json({ message: "book created successfully", data: book });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  },
);
