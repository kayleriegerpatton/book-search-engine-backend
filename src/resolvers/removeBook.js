const { AuthenticationError, ApolloError } = require("apollo-server");
const { User } = require("../models");

const removeBook = async (_, { bookId }, context) => {
  //* accepts a book's bookId as a parameter; returns a User type
  try {
    if (!context.user) {
      throw new AuthenticationError("You must be logged in to delete a book.");
    }

    const updatedUser = await User.findByIdAndUpdate(
      context.user.id,
      {
        $pull: { savedBooks: { bookId } },
      },
      { new: true }
    );

    return updatedUser;
  } catch (error) {
    console.log(`[ERROR]: Failed to delete book | ${error.message}`);
    throw new ApolloError("Failed to delete book.");
  }
};

module.exports = removeBook;
