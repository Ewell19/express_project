const User = require("../models/user");
const httpStatusCodes = require("../utils/errors");

// Get all users
const getUsers = (req, res) => {
  User.find()
    .then((users) => res.send(users))
    .catch((err) =>
      res
        .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: err.message }),
    );
};

// Get user by ID

// Create a new user
const createUser = (req, res) => {
  const { name, avatar } = req.body;

  User.create({ name, avatar })
    .then((user) => res.status(httpStatusCodes.CREATED).json(user))
    .catch((err) => {
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

const getUser = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
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

module.exports = { getUsers, createUser, getUser };
