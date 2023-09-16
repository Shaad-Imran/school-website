const express = require("express");
const router = express.Router();
const Contact = require("../models/contact"); // Import the Contact model

// Create a new contact form submission
router.post("/", async (req, res) => {
  try {
    const contactSubmission = new Contact(req.body);
    await contactSubmission.save();
    res.status(201).json(contactSubmission);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all contact form submissions
router.get("/", async (req, res) => {
  try {
    const contactSubmissions = await Contact.find();
    res.status(200).json(contactSubmissions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single contact form submission by ID
router.get("/:id", async (req, res) => {
  try {
    const contactSubmission = await Contact.findById(req.params.id);
    if (!contactSubmission) {
      return res
        .status(404)
        .json({ message: "Contact form submission not found" });
    }
    res.status(200).json(contactSubmission);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a contact form submission by ID
router.delete("/:id", async (req, res) => {
  try {
    const contactSubmission = await Contact.findByIdAndRemove(req.params.id);
    if (!contactSubmission) {
      return res
        .status(404)
        .json({ message: "Contact form submission not found" });
    }
    res.status(204).end(); // Respond with no content (successful deletion)
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
