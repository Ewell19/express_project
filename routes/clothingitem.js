const router = require("express").Router();
const auth = require("../middlewares/auth");

const {
  getClothingItems,
  createClothingItem,
  likeItem,
  unlikeItem,
  deleteClothingItem,
} = require("../controllers/clothingItems");

router.get("/", getClothingItems);
router.post("/", auth, createClothingItem);
router.put("/:itemId/likes", auth, likeItem);
router.delete("/:itemId/likes", auth, unlikeItem);
router.delete("/:itemId", auth, deleteClothingItem);

module.exports = router;
