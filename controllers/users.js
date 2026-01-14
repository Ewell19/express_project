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

const getUser = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      return res.json(user);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(400).json({ error: "Invalid user ID" });
      }
      return res.status(500).json({ error: err.message });
    });
};

module.exports = { getUsers, createUser };
