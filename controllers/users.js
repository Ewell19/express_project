const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { JWT_SECRET } = require("../utils/config");
const httpStatusCodes = require("../utils/errors");

// Login controller
const login = (req, res) => {
  const body = req.body || {};
  const { email, password } = body;
  const hasEmail = Object.prototype.hasOwnProperty.call(body, "email");
  const hasPassword = Object.prototype.hasOwnProperty.call(body, "password");

  if (
    !hasEmail ||
    !hasPassword ||
    typeof email !== "string" ||
    typeof password !== "string" ||
    !email.trim() ||
    !password.trim()
  ) {
    return res
      .status(httpStatusCodes.BAD_REQUEST)
      .json({ message: "Email and password are required" });
  }

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.status(200).json({ token });
    })
    .catch((err) => {
      if (err.statusCode === httpStatusCodes.BAD_REQUEST) {
        return res
          .status(httpStatusCodes.BAD_REQUEST)
          .json({ message: err.message });
      }
      return res
        .status(httpStatusCodes.UNAUTHORIZED)
        .json({ message: err.message });
    });
};

// Get all users
const getUsers = (req, res) => {
  User.find()
    .then((users) => res.send(users))
    .catch((err) =>
      res
        .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: err.message }),
    );
};

// Create a new user
const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;

  User.create({ name, avatar, email, password })
    .then((user) => {
      const userObj = user.toObject();
      delete userObj.password;
      res.status(httpStatusCodes.CREATED).json(userObj);
    })
    .catch((err) => {
      if (err.code === 11000) {
        return res
          .status(httpStatusCodes.CONFLICT)
          .json({ message: "Email already exists" });
      }
      if (err.name === "ValidationError") {
        return res
          .status(httpStatusCodes.BAD_REQUEST)
          .json({ message: err.message });
      }
      return res
        .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: err.message });
    });
};

// Get current user
const getCurrentUser = (req, res) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        return res
          .status(httpStatusCodes.NOT_FOUND)
          .json({ message: "User not found" });
      }
      return res.json(user);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res
          .status(httpStatusCodes.BAD_REQUEST)
          .json({ message: "Invalid user ID" });
      }
      return res
        .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: err.message });
    });
};

// Update current user
const updateUser = (req, res) => {
  const { name, avatar } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(
    userId,
    { name, avatar },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        return res
          .status(httpStatusCodes.NOT_FOUND)
          .json({ message: "User not found" });
      }
      return res.json(user);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res
          .status(httpStatusCodes.BAD_REQUEST)
          .json({ message: err.message });
      }
      if (err.name === "CastError") {
        return res
          .status(httpStatusCodes.BAD_REQUEST)
          .json({ message: "Invalid user ID" });
      }
      return res
        .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: err.message });
    });
};

module.exports = { login, getUsers, createUser, getCurrentUser, updateUser };
