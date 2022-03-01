const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const bookSchema = require("./Book");

// db schema
const userSchema = {
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, "Must use a valid email address"],
  },
  password: {
    type: String,
    required: true,
  },
  // set savedBooks to be an array of data that adheres to the bookSchema
  savedBooks: [bookSchema],
};

const schema = new Schema(userSchema, {
  toJSON: {
    getters: true,
  },
});

// virtual to total book count
schema.virtual("bookCount").get(function () {
  return this.savedBooks.length;
});

// hash user password
schema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }

  next();
});

// custom method to compare and validate password for logging in
schema.methods.checkPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model("User", schema);

module.exports = User;
