const express = require("express");
const Feedback = require("../models/Feedback");
const router = express.Router();

router.post("/", async (req, res) => {
  const { user, message, rating } = req.body;
  const feedback = new Feedback({ user, message, rating });
  try {
    await feedback.save();
    res.status(201).json({ message: "Feedback submitted successfully" });
  } catch (err) {
    res.status(400).json({ error: "Error submitting feedback" });
  }
});

router.get("/", async (req, res) => {
  try {
    const feedbacks = await Feedback.find().populate("user", "name email");
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ error: "Error fetching feedback" });
  }
});

module.exports = router;
