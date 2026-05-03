const router = require("express").Router();
const { login, createUser } = require("../controllers/users");
const usersRouter = require("./users");
const clothingItemsRouter = require("./clothingitem");
const NotFoundError = require("../errors/not-found-error");
const {
  validateSignIn,
  validateSignUp,
} = require("../middlewares/validation");

router.post("/signin", validateSignIn, login);
router.post("/signup", validateSignUp, createUser);

router.use("/users", usersRouter);
router.use("/items", clothingItemsRouter);

router.use((req, res, next) => {
  next(new NotFoundError("Requested resource not found"));
});

module.exports = router;
