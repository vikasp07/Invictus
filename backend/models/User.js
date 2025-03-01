const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: String,
  location: String,
  role: { type: String, enum: ["user", "owner"], default: "user" },
  loyaltyPoints: { type: Number, default: 0 },
});

module.exports = mongoose.model("User", UserSchema);
