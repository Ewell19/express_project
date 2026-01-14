const router = require("express").Router();
const usersRouter = require("./users");
const clothingItemsRouter = require("./clothingitem");

router.use("/items", clothingItemsRouter);

router.use("/users", usersRouter);

module.exports = router;
