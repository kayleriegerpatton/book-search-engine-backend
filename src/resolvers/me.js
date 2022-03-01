const { User } = require("../models");

const me = async (_, { userId }) => {
  const user = await User.findById(userId);
  return user;
};

module.exports = me;
