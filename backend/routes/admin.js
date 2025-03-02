const express = require("express");
const Ride = require("../models/Ride");
const User = require("../models/User");
const router = express.Router();

// Get all rides
router.get("/rides", async (req, res) => {
  try {
    const rides = await Ride.find()
      .populate("driver", "name email")
      .populate("passengers", "name email");
    res.json(rides);
  } catch (err) {
    res.status(500).json({ error: "Error fetching rides" });
  }
});

// Get all users
router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Error fetching users" });
  }
});

// Analytics endpoint
router.get("/analytics", async (req, res) => {
  try {
    const totalRides = await Ride.countDocuments();
    const completedRides = await Ride.countDocuments({ status: "completed" });
    const cancelledRides = await Ride.countDocuments({ status: "cancelled" });
    res.json({ totalRides, completedRides, cancelledRides });
  } catch (err) {
    res.status(500).json({ error: "Error fetching analytics" });
  }
});

module.exports = router;
