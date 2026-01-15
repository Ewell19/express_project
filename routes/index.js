const router = require("express").Router();
const usersRouter = require("./users");
const clothingItemsRouter = require("./clothingitem");
const httpStatusCodes = require("../utils/errors");

router.use("/items", clothingItemsRouter);

router.use("/users", usersRouter);

// 404 handler for non-existent routes
router.use((req, res) => {
  res
    .status(httpStatusCodes.NOT_FOUND)
    .json({ message: "Requested resource not found" });
});

module.exports = router;
