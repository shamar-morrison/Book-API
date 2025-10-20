import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, "Book title is required"] },
    author: { type: String, required: [true, "Author name is required"] },
    genre: String,
    publishedYear: {
      type: Number,
      required: [true, "Published Year is required"],
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

// Automatically infer the TypeScript type from the schema
export type IBook = mongoose.InferSchemaType<typeof bookSchema>;

// Compile schema to form model
export const Book = mongoose.model<IBook>("Book", bookSchema);
