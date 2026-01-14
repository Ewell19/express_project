const User = require("../models/user");

// Get all users
const getUsers = (req, res) => {
  User.find()
    .then((users) => res.send(users))
    .catch((err) => res.status(500).json({ error: err.message }));
};

// Get user by ID

module.exports = { getUsers };
