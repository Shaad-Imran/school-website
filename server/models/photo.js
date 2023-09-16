const mongoose = require("mongoose");

// Define the Photo schema
const photoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

// Create and export the Photo model
module.exports = mongoose.model("Photo", photoSchema);
