const express = require("express");
const mongoose = require("mongoose");
const mainRoutes = require("./routes/index");

const app = express();
const { PORT = 3001 } = process.env;

// Middleware to parse JSON bodies
app.use(express.json());

// Temporary hardcoded user for auth-free requests expected by tests
app.use((req, res, next) => {
  req.user = { _id: "6967e5d97092b79cd2e8d44b" };
  next();
});

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });

app.use("/", mainRoutes);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});
