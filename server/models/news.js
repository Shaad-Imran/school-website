const mongoose = require("mongoose");

// Define the News schema
const newsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  publishedAt: {
    type: Date,
    default: Date.now,
  },
});

// Create and export the News model
module.exports = mongoose.model("News", newsSchema);
