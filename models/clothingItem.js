const mongoose = require("mongoose");
const validator = require("validator");

const clothingitemSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 2, maxlength: 30 },
  weather: {
    type: String,
    required: true,
    enum: ["hot", "warm", "cold"],
  },
  imageUrl: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isURL(v),
      message: (props) => `${props.value} is not a valid URL!`,
    },
  },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, required: true, default: Date.now },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", default: [] }],
});

module.exports = mongoose.model("ClothingItem", clothingitemSchema);
