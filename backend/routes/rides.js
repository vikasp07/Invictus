const express = require("express");
const Ride = require("../models/Ride");
const router = express.Router();

// Create a ride request (user booking)
// Now only accepts: driver, pickup, destination, scheduledTime
router.post("/create", async (req, res) => {
  const { driver, pickup, destination, scheduledTime } = req.body;
  const ride = new Ride({
    driver,
    pickup,
    destination,
    scheduledTime,
    status: "pending",
    fare: null, // to be set by owner on confirmation
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
      // Prevent duplicate join – add only if not already joined
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

// Owner confirms a ride by providing estimated time and total fare
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

// (Optional) Update ride’s current location for real-time tracking
router.post("/update-location/:rideId", async (req, res) => {
  const { currentLocation } = req.body;
  try {
    const ride = await Ride.findById(req.params.rideId);
    if (ride) {
      ride.currentLocation = currentLocation;
      await ride.save();
      res.json({ message: "Location updated", ride });
    } else {
      res.status(404).json({ error: "Ride not found" });
    }
  } catch (err) {
    res.status(400).json({ error: "Error updating location" });
  }
});

module.exports = router;
