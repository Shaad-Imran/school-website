const express = require("express");
const router = express.Router();
const Photo = require("../models/photo"); // Import the Photo model

// Create a new photo
router.post("/", async (req, res) => {
  try {
    const photo = new Photo(req.body);
    await photo.save();
    res.status(201).json(photo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all photos
router.get("/", async (req, res) => {
  try {
    const photos = await Photo.find();
    res.status(200).json(photos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single photo by ID
router.get("/:id", async (req, res) => {
  try {
    const photo = await Photo.findById(req.params.id);
    if (!photo) {
      return res.status(404).json({ message: "Photo not found" });
    }
    res.status(200).json(photo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a photo by ID
router.put("/:id", async (req, res) => {
  try {
    const photo = await Photo.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Return the updated photo
      runValidators: true, // Run validation on updated data
    });
    if (!photo) {
      return res.status(404).json({ message: "Photo not found" });
    }
    res.status(200).json(photo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a photo by ID
router.delete("/:id", async (req, res) => {
  try {
    const photo = await Photo.findByIdAndRemove(req.params.id);
    if (!photo) {
      return res.status(404).json({ message: "Photo not found" });
    }
    res.status(204).end(); // Respond with no content (successful deletion)
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
