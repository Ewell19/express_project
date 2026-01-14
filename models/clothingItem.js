const mongoose = require("mongoose");

const clothingitemSchema = new mongoose.Schema({});

module.exports = mongoose.model("item", clothingitemSchema);
