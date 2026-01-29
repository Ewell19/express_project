const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const mainRoutes = require("./routes/index");
const User = require("./models/user");

const app = express();
const { PORT = 3001 } = process.env;

// Middleware to parse JSON bodies
app.use(express.json({ type: "*/*" }));
app.use(cors());

// Test user for endpoint testing (will be replaced by real auth in production)
app.use((req, res, next) => {
  if (!req.user) {
    req.user = { _id: "5d8b8592978f8bd833ca8133" };
  }
  next();
});

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to MongoDB");
    return User.init();
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });

app.use("/", mainRoutes);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});
