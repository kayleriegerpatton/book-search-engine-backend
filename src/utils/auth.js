const jwt = require("jsonwebtoken");

// set token secret and expiration date
const secret = "mysecretsshhhhh";
const expiration = "2h";

module.exports = {
  // function for our authenticated routes
  authMiddleware: function (req, res, next) {
    // allows token to be sent via  req.query or headers
    let token = req.query.token || req.headers.authorization;

    // ["Bearer", "<tokenvalue>"]
    if (req.headers.authorization) {
      token = token.split(" ").pop().trim();
    }

    if (!token) {
      return res.status(400).json({ message: "You have no token!" });
    }

    // verify token and get user data out of it
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log("Invalid token");
      return res.status(400).json({ message: "invalid token!" });
    }

    // send to next endpoint
    next();
  },
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};

//* GRAPHQL AUTH FUNCTION
// const { AuthenticationError } = require("apollo-server");
// const jwt = require("jsonwebtoken");

// const secret = process.env.SECRET;
// const expiration = "2h";

// const signToken = ({ email, name, id }) => {
//   const payload = { email, name, id };
//   return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
// };

// const authMiddleware = ({ req }) => {
//   let token = req.body.token || req.query.token || req.headers.authorization;

//   if (req.headers.authorization) {
//     token = token.split(" ").pop().trim();
//   }

//   if (!token) {
//     return req;
//   }

//   try {
//     const { data } = jwt.verify(token, secret, { maxAge: expiration });
//     req.user = data;
//   } catch {
//     throw new AuthenticationError("Invalid token");
//   }

//   return req;
// };

// module.exports = {
//   signToken,
//   authMiddleware,
// };
