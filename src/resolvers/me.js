const { AuthenticationError } = require("apollo-server");

const { User } = require("../models");

const me = async (_, __, { user }) => {
  if (user) {
    const userFromDb = await User.findById(user.id);
    return userFromDb;
  }
  throw new AuthenticationError("Unauthorized access.");
};

module.exports = me;
