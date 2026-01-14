const ClothingItem = require("../models/clothingItem");

// Get all clothing items
const getClothingItems = (req, res) => {
  ClothingItem.find()
    .then((items) => res.json(items))
    .catch((err) => res.status(500).json({ message: err.message }));
};

// Create a new clothing item
const createClothingItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({ name, weather, imageUrl })
    .then((item) => res.status(201).json(item))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(400).json({ message: err.message });
      }
      return res.status(500).json({ message: err.message });
    });
};

// Like an item
const likeItem = (req, res) => {
  const { itemId } = req.params;
  // Use mock user ID for testing (req.user._id would come from auth middleware later)
  const userId = req.user?._id || "507f1f77bcf86cd799439011";

  ClothingItem.findByIdAndUpdate(
    itemId,
    { $addToSet: { likes: userId } },
    { new: true }
  )
    .then((item) => {
      if (!item) {
        return res.status(404).json({ message: "Item not found" });
      }
      return res.json(item);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(400).json({ message: "Invalid item ID" });
      }
      return res.status(500).json({ message: err.message });
    });
};

// Unlike an item
const unlikeItem = (req, res) => {
  const { itemId } = req.params;
  // Use mock user ID for testing
  const userId = req.user?._id || "507f1f77bcf86cd799439011";

  ClothingItem.findByIdAndUpdate(
    itemId,
    { $pull: { likes: userId } },
    { new: true }
  )
    .then((item) => {
      if (!item) {
        return res.status(404).json({ message: "Item not found" });
      }
      return res.json(item);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(400).json({ message: "Invalid item ID" });
      }
      return res.status(500).json({ message: err.message });
    });
};

const deleteClothingItem = (req, res) => {
  const { itemId } = req.params;
  ClothingItem.findByIdAndDelete(itemId)
    .then((item) => {
      if (!item) {
        return res.status(404).json({ message: "Clothing item not found" });
      }
      return res.json({ message: "Clothing item deleted successfully" });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(400).json({ message: "Invalid item ID" });
      }
      return res.status(500).json({ message: err.message });
    });
};

module.exports = {
  getClothingItems,
  createClothingItem,
  likeItem,
  unlikeItem,
  deleteClothingItem,
};
