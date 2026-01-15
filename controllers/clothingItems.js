const ClothingItem = require("../models/clothingItem");
const httpStatusCodes = require("../utils/errors");

// Get all clothing items
const getClothingItems = (req, res) => {
  ClothingItem.find()
    .then((items) => res.json(items))
    .catch((err) =>
      res
        .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: err.message }),
    );
};

// Create a new clothing item
const createClothingItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => res.status(httpStatusCodes.CREATED).json(item))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res
          .status(httpStatusCodes.BAD_REQUEST)
          .json({ message: err.message });
      }
      return res
        .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: err.message });
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
    { new: true },
  )
    .then((item) => {
      if (!item) {
        return res
          .status(httpStatusCodes.NOT_FOUND)
          .json({ message: "Item not found" });
      }
      return res.json(item);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res
          .status(httpStatusCodes.BAD_REQUEST)
          .json({ message: "Invalid item ID" });
      }
      return res
        .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: err.message });
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
    { new: true },
  )
    .then((item) => {
      if (!item) {
        return res
          .status(httpStatusCodes.NOT_FOUND)
          .json({ message: "Item not found" });
      }
      return res.json(item);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res
          .status(httpStatusCodes.BAD_REQUEST)
          .json({ message: "Invalid item ID" });
      }
      return res
        .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: err.message });
    });
};

const deleteClothingItem = (req, res) => {
  const { itemId } = req.params;
  ClothingItem.findByIdAndDelete(itemId)
    .then((item) => {
      if (!item) {
        return res
          .status(httpStatusCodes.NOT_FOUND)
          .json({ message: "Clothing item not found" });
      }
      return res.json({ message: "Clothing item deleted successfully" });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res
          .status(httpStatusCodes.BAD_REQUEST)
          .json({ message: "Invalid item ID" });
      }
      return res
        .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: err.message });
    });
};

module.exports = {
  getClothingItems,
  createClothingItem,
  likeItem,
  unlikeItem,
  deleteClothingItem,
};
