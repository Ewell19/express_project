const User = require("../models/user");

// Get all users
const getUsers = (req, res) => {
  User.find()
    .then((users) => res.send(users))
    .catch((err) => res.status(500).json({ error: err.message }));
};

// Get user by ID

// Create a new user
const createUser = (req, res) => {
  let { name, avatar } = req.body || {};

  // Set defaults if missing
  name = name || "Default User";
  avatar = avatar || "https://example.com/default.jpg";

  User.create({ name, avatar })
    .then((user) => res.status(201).json(user))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(400).json({ error: err.message });
      }
      return res.status(500).json({ error: err.message });
    });
};

module.exports = { getUsers, createUser };
