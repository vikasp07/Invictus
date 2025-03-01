const express = require("express");
const Ride = require("../models/Ride");
const router = express.Router();

// Helper for dynamic fare calculation (example: base fare + factors)
function calculateFare(distance, duration) {
  const baseFare = 50;
  const fare = baseFare + distance * 10 + duration * 0.5;
  return Math.round(fare);
}

// Create a ride (user booking)
router.post("/create", async (req, res) => {
  const { driver, pickup, destination, distance, duration, scheduledTime } =
    req.body;
  const fare = calculateFare(distance, duration);
  const ride = new Ride({
    driver,
    pickup,
    destination,
    fare,
    scheduledTime,
    status: "pending",
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

// Get available (pending) rides
router.get("/available", async (req, res) => {
  try {
    const rides = await Ride.find({ status: "pending" }).populate(
      "driver",
      "name phone"
    );
    res.json(rides);
  } catch (err) {
    res.status(500).json({ error: "Error fetching rides" });
  }
});

// Join a ride (carpool option)
router.post("/join/:rideId", async (req, res) => {
  const { userId } = req.body;
  try {
    const ride = await Ride.findById(req.params.rideId);
    if (ride) {
      ride.passengers.push(userId);
      // Update fare per person (simple split)
      ride.fare = Math.round(ride.fare / (ride.passengers.length + 1));
      await ride.save();
      res.json({ message: "Ride joined successfully", ride });
    } else {
      res.status(404).json({ error: "Ride not found" });
    }
  } catch (err) {
    res.status(400).json({ error: "Error joining ride" });
  }
});

// Cancel a ride booking
router.post("/cancel/:rideId", async (req, res) => {
  const { userId } = req.body;
  try {
    const ride = await Ride.findById(req.params.rideId);
    if (ride) {
      if (
        ride.driver.toString() === userId ||
        ride.passengers.includes(userId)
      ) {
        ride.status = "cancelled";
        await ride.save();
        res.json({ message: "Ride cancelled successfully" });
      } else {
        res.status(403).json({ error: "Not authorized to cancel this ride" });
      }
    } else {
      res.status(404).json({ error: "Ride not found" });
    }
  } catch (err) {
    res.status(400).json({ error: "Error cancelling ride" });
  }
});

// Update ride's current location (for real-time tracking)
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

// Owner confirms a ride
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
    ride.finalFare = finalFare;
    await ride.save();
    res.json({ message: "Ride confirmed", ride });
  } catch (err) {
    res.status(400).json({ error: "Error confirming ride" });
  }
});

module.exports = router;
