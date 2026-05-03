const router = require("express").Router();
const auth = require("../middlewares/auth");
const {
  getClothingItems,
  createClothingItem,
  deleteClothingItem,
  likeItem,
  unlikeItem,
} = require("../controllers/clothingItems");
const {
  validateCreateItem,
  validateIdParam,
} = require("../middlewares/validation");

router.get("/", getClothingItems);

router.use(auth);

router.post("/", validateCreateItem, createClothingItem);
router.delete("/:id", validateIdParam, deleteClothingItem);
router.put("/:id/likes", validateIdParam, likeItem);
router.delete("/:id/likes", validateIdParam, unlikeItem);

module.exports = router;
