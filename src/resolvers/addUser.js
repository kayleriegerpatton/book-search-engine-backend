const { User } = require("../models");
const { signToken } = require("../utils/auth");

const addUser = async (_, { user }) => {
  //* accepts a username, email, and password as parameters; returns an Auth type
  const newUser = await User.create(user);

  return {
    token: signToken(newUser),
    user: newUser,
  };
};

module.exports = addUser;
