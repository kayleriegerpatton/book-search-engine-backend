const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../models");

const removeBook = async (_, { bookId }, context) => {
  //* accepts a book's bookId as a parameter; returns a User type
  try {
    if (!context.user) {
      console.log("no context", context);
      throw new AuthenticationError("You must be logged in to delete a book.");
    }

    const updatedUser = await User.findByIdAndUpdate(
      context.user.id,
      {
        $pull: { savedBooks: { bookId: bookId } },
      },
      { new: true }
    );

    return updatedUser;
  } catch (error) {
    console.log(`[ERROR]: Failed to delete book | ${error.message}`);
  }
};

module.exports = removeBook;
