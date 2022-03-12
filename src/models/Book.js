const { Schema } = require("mongoose");

// Subdocument schema; won't become a model, but used as schema for User model's `savedBooks` array
const bookSchema = {
  authors: [
    {
      type: String,
    },
  ],
  description: {
    type: String,
    required: true,
  },
  // saved book id from GoogleBooks
  bookId: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  link: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
};

const schema = new Schema(bookSchema);

module.exports = schema;
