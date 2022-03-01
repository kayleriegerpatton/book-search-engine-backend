const { AuthenticationError } = require("apollo-server-express");

const { User } = require("../models");

const saveBook = async (_, { book }, context, info) => {
  //* accepts a book author's array, description, title, bookId, image, and link as parameters; returns a User type

  try {
    console.log("book body:", book);
    if (!context.user) {
      throw new AuthenticationError("You must be logged in to add a book.");
    }

    const updatedUser = await User.findByIdAndUpdate(
      context.user.id,

      {
        $addToSet: { savedBooks: book },
      },
      { new: true }
    );

    return updatedUser;
  } catch (error) {
    console.log(`[ERROR]: Failed to add book | ${error.message}`);
  }
};

module.exports = saveBook;
