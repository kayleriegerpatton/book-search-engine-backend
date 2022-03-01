const { AuthenticationError } = require("apollo-server-express");

const { User } = require("../models");
const { signToken } = require("../utils/auth");

const login = async (_, { user }) => {
  //* accepts an email and password as parameters, returns an Auth type
  const userFromDb = await User.findOne({ email: user.email });

  if (!userFromDb) {
    console.log("[ERROR]: Failed to login. User does not exist.");
    throw new AuthenticationError("Failed to login.");
  }

  const isValidPassword = await userFromDb.checkPassword(user.password);

  if (!isValidPassword) {
    console.log("[ERROR]: Failed to login. Incorrect password.");
    throw new AuthenticationError("Failed to login.");
  }

  // return Auth type
  return {
    token: signToken(userFromDb),
    user: userFromDb,
  };
};

module.exports = login;
