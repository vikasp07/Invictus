const express = require("express");
const Ride = require("../models/Ride");
const router = express.Router();

// Create a Ride
router.post("/create", async (req, res) => {
  const { driver, pickup, destination, fare } = req.body;
  const ride = new Ride({ driver, pickup, destination, fare });

  try {
    await ride.save();
    res.status(201).json(ride);
  } catch (error) {
    res.status(400).json({ error });
  }
});

// Get Available Rides
router.get("/available", async (req, res) => {
  const rides = await Ride.find({ status: "pending" }).populate(
    "driver",
    "name phone"
  );
  res.json(rides);
});

// Join a Ride
router.post("/join/:rideId", async (req, res) => {
  const { userId } = req.body;
  const ride = await Ride.findById(req.params.rideId);

  if (ride) {
    ride.passengers.push(userId);
    await ride.save();
    res.json({ message: "Ride joined successfully" });
  } else {
    res.status(404).json({ error: "Ride not found" });
  }
});

module.exports = router;
