const express = require("express");
const Ride = require("../models/Ride");
const router = express.Router();

// Create a ride request (user booking)
// Only requires: driver, pickup, destination, scheduledTime.
router.post("/create", async (req, res) => {
  const { driver, pickup, destination, scheduledTime } = req.body;
  const ride = new Ride({
    driver,
    pickup,
    destination,
    scheduledTime,
    status: "pending",
    fare: null, // To be set by owner upon confirmation.
    estimatedTime: null,
    route: [],
    currentLocation: pickup,
  });
  try {
    await ride.save();
    res.status(201).json(ride);
  } catch (err) {
    res.status(400).json({ error: "Error creating ride" });
  }
});

// Get available rides (both pending and confirmed)
router.get("/available", async (req, res) => {
  try {
    const rides = await Ride.find({
      status: { $in: ["pending", "confirmed"] },
    }).populate("driver", "name phone");
    res.json(rides);
  } catch (err) {
    res.status(500).json({ error: "Error fetching rides" });
  }
});

// Join a ride (for ride sharing)
router.post("/join/:rideId", async (req, res) => {
  const { userId } = req.body;
  try {
    const ride = await Ride.findById(req.params.rideId);
    if (ride) {
      // Avoid duplicate joins.
      if (!ride.passengers.includes(userId)) {
        ride.passengers.push(userId);
      }
      await ride.save();
      res.json({ message: "Ride joined successfully", ride });
    } else {
      res.status(404).json({ error: "Ride not found" });
    }
  } catch (err) {
    res.status(400).json({ error: "Error joining ride" });
  }
});

// Owner confirms a ride by providing estimated time and total fare.
router.post("/confirm/:rideId", async (req, res) => {
  const { ownerId, estimatedTime, finalFare } = req.body;
  try {
    const ride = await Ride.findById(req.params.rideId);
    if (!ride) {
      return res.status(404).json({ error: "Ride not found" });
    }
    if (ride.status !== "pending") {
      return res.status(400).json({ error: "Ride is not pending" });
    }
    ride.status = "confirmed";
    ride.ownerConfirmation = ownerId;
    ride.estimatedTime = estimatedTime;
    ride.fare = finalFare;
    await ride.save();
    res.json({ message: "Ride confirmed", ride });
  } catch (err) {
    res.status(400).json({ error: "Error confirming ride" });
  }
});

// Get current ride details for a given user (if exists)
router.get("/current/:userId", async (req, res) => {
  try {
    const ride = await Ride.findOne({
      status: { $in: ["confirmed", "ongoing"] },
      $or: [{ driver: req.params.userId }, { passengers: req.params.userId }],
    }).populate("driver", "name phone");
    res.json(ride);
  } catch (err) {
    res.status(500).json({ error: "Error fetching current ride" });
  }
});

module.exports = router;
