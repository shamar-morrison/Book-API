import express from "express";
import dotenv from "dotenv";
import { type IBook, Book } from "models/book.js";
import type { Request, Response } from "express";
import mongoose from "mongoose";

dotenv.config();

const app = express();
app.use(express.json());
const port = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGODB_URI as string)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

// Get all books
app.get("/api/v1/books", async (_, res: Response) => {
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
app.put("/api/v1/books/:id", async (req, res) => {
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
app.get("/api/v1/books/:id", async (req, res) => {
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
app.delete("/api/v1/books/:id", async (req, res) => {
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
app.post(
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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
