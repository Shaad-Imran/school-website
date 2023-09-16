const express = require("express");
const router = express.Router();
const News = require("../models/news"); // Import the News model

// Create a new news article
router.post("/", async (req, res) => {
  try {
    const newsArticle = new News(req.body);
    await newsArticle.save();
    res.status(201).json(newsArticle);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all news articles
router.get("/", async (req, res) => {
  try {
    const newsArticles = await News.find();
    res.status(200).json(newsArticles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single news article by ID
router.get("/:id", async (req, res) => {
  try {
    const newsArticle = await News.findById(req.params.id);
    if (!newsArticle) {
      return res.status(404).json({ message: "News article not found" });
    }
    res.status(200).json(newsArticle);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a news article by ID
router.put("/:id", async (req, res) => {
  try {
    const newsArticle = await News.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Return the updated news article
      runValidators: true, // Run validation on updated data
    });
    if (!newsArticle) {
      return res.status(404).json({ message: "News article not found" });
    }
    res.status(200).json(newsArticle);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a news article by ID
router.delete("/:id", async (req, res) => {
  try {
    const newsArticle = await News.findByIdAndRemove(req.params.id);
    if (!newsArticle) {
      return res.status(404).json({ message: "News article not found" });
    }
    res.status(204).end(); // Respond with no content (successful deletion)
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
