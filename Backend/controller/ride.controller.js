const { validationResult } = require("express-validator");
const rideModel = require("../model/ride.model");
const rideService = require("../services/ride.service");

module.exports.createRide = async (req, res) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() });
  }

  try {
    const { pickup, destination, vehicleType } = req.body;
    const userId = req.user._id;
    console.log(userId);
    const response = await rideService.createRide({
      userId: userId,
      pickup,
      destination,
      vehicleType,
    });

    res.status(201).json(response);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
