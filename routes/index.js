const router = require("express").Router();
const { login, createUser } = require("../controllers/users");
const usersRouter = require("./users");
const clothingItemsRouter = require("./clothingitem");
const httpStatusCodes = require("../utils/errors");

router.post("/signin", login);
router.post("/signup", createUser);

router.use("/users", usersRouter);
router.use("/items", clothingItemsRouter);

// 404 handler for non-existent routes
router.use((req, res) => {
  res
    .status(httpStatusCodes.NOT_FOUND)
    .json({ message: "Requested resource not found" });
});

module.exports = router;
