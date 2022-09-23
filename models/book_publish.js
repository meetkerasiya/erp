const { number } = require("joi");
const mongoose = require("mongoose");
const bookSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  co_author: {
    type: [String],
  },
  publisher: {
    type: String,
    required: true,
  },
  ISBN: {
    type: String,
    required: true,
  },
  is_deleted: {
    type: Boolean,
    required: false,
    default: false,
  },
});
const Book = mongoose.model("book_publish", bookSchema);

module.exports = Book;
