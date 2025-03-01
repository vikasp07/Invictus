const mongoose = require("mongoose");

const RideSchema = new mongoose.Schema(
  {
    driver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    passengers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    pickup: { type: String, required: true },
    destination: { type: String, required: true },
    fare: Number,
    status: {
      type: String,
      enum: ["pending", "confirmed", "ongoing", "completed", "cancelled"],
      default: "pending",
    },
    scheduledTime: { type: Date },
    route: Array,
    currentLocation: { type: String },
    ownerConfirmation: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    estimatedTime: Number,
    finalFare: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Ride", RideSchema);
