const mongoose = require("mongoose");

// Define the Event schema
const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

// Create and export the Event model
module.exports = mongoose.model("Event", eventSchema);
