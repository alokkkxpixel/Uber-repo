const { validationResult } = require("express-validator");
const rideModel = require("../model/ride.model");
const rideService = require("../services/ride.service");

module.exports.createRide = async (req, res) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() });
  }

  try {
    const { Pickup, Destination, vehicleType } = req.body;
    const userId = req.user._id;
    console.log(userId);
    const response = await rideService.createRide({
      userId: userId,
      Pickup,
      Destination,
      vehicleType,
    });

    res.status(201).json(response);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};


module.exports.getFareRide = async (req, res) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() });
  }

  try {
    const { Pickup, Destination } = req.query;

    const response = await rideService.getFare(Pickup, Destination);

    res.status(201).json({
      pickup: response.pickup,
      destination: response.destination,
      fare: {
        auto: response.fare.auto,
        car: response.fare.car,
        moto: response.fare.moto,
      },
      distance: response.distance,
      distanceValue: response.distanceValue,
      duration: response.duration,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};