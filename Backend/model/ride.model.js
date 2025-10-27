const mongoose = require("mongoose");

const rideSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  captain: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "captain",
  },
  Pickup: {
    type: String,
    required: true,
  },
  Destination: {
    type: String,
    required: true,
  },
  vehicleType: {
    type: String,
    enum: ["auto", "car", "moto"],
    required: true, // ✅ Make sure this is present
  },
  otp: {
    type: String,
    select: false,
    required: true,
  },
  fare: {
    type: Number,
    required: true,
  },

  status: {
    type: String,
    enum: ["pending", "accepted", "ongoing", "completed", "cancelled"],
    default: "pending",
  },
  duration: {
    type: Number,
  }, // in seconds
  distance: {
    type: String,
  }, // in meters
  paymentID: {
    type: String,
  },
  orderId: {
    type: String,
  },
  signiture: {
    type: String,
  },
});

module.exports = mongoose.model("ride", rideSchema);
