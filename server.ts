import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import { booksRouter } from "routes/books-router.js";

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

app.use("/", booksRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
