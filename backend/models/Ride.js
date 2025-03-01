const mongoose = require("mongoose");

const RideSchema = new mongoose.Schema({
  driver: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  passengers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  pickup: String,
  destination: String,
  fare: Number,
  status: {
    type: String,
    enum: ["pending", "ongoing", "completed"],
    default: "pending",
  },
});

module.exports = mongoose.model("Ride", RideSchema);
