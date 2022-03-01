const { User } = require("../models");

const addUser = async (_, { username, email, password }) => {
  //* accepts a username, email, and password as parameters; returns an Auth type
  const newUser = await User.return;
};

module.exports = addUser;
