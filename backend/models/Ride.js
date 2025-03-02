const mongoose = require("mongoose");

const RideSchema = new mongoose.Schema(
  {
    driver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, // the ride requester
    passengers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    pickup: { type: String, required: true },
    destination: { type: String, required: true },
    scheduledTime: { type: Date, required: true },
    status: {
      type: String,
      enum: ["pending", "confirmed", "ongoing", "completed", "cancelled"],
      default: "pending",
    },
    fare: { type: Number, default: null }, // total fare set by owner on confirmation
    estimatedTime: { type: Number, default: null }, // in minutes, set by owner
    route: Array,
    currentLocation: { type: String },
    ownerConfirmation: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Ride", RideSchema);
