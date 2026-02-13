const mongoose = require("mongoose");

const paperSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  title: String,
  summary: String,
  authors: [String],
  link: String,
  savedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Paper", paperSchema);
