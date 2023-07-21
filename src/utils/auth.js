//   authMiddleware: function (req, res, next) {

//     // send to next endpoint
//     next();
//   },

//* GRAPHQL AUTH FUNCTION
const { AuthenticationError } = require("apollo-server");
const jwt = require("jsonwebtoken");

// set token secret and expiration date
const secret = process.env.SECRET;
const expiration = "2h";

const signToken = ({ email, name, id }) => {
  const payload = { email, name, id };
  return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
};

// for authenticated routes
const authMiddleware = ({ req }) => {
  // get token from req.query or headers
  let token = req.body.token || req.query.token || req.headers.authorization;

  if (req.headers.authorization) {
    // ["Bearer" "<tokenvalue>"]
    token = token.split(" ").pop().trim();
  }

  if (!token) {
    return req;
  }

  // verify token and get user data from it
  try {
    const { data } = jwt.verify(token, secret, { maxAge: expiration });
    req.user = data;
  } catch {
    throw new AuthenticationError("Invalid token.");
  }

  return req;
};

module.exports = {
  signToken,
  authMiddleware,
};
