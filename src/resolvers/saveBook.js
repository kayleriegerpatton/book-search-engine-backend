const { AuthenticationError, ApolloError } = require("apollo-server");

const { User } = require("../models");

const saveBook = async (_, { book }, context, info) => {
  //* accepts a book author's array, description, title, bookId, image, and link as parameters; returns a User type

  try {
    if (!context.user) {
      throw new AuthenticationError("You must be logged in to add a book.");
    }

    const updatedUser = await User.findOneAndUpdate(
      { _id: context.user.id },

      {
        $addToSet: { savedBooks: book },
      },
      { new: true, runValidators: true, upsert: true }
    );

    return updatedUser;
  } catch (error) {
    console.log(`[ERROR]: Failed to add book | ${error.message}`);
    throw new ApolloError("Failed to add book.");
  }
};

module.exports = saveBook;
