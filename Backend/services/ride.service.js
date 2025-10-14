const { model } = require("mongoose");
const { getDistanceAndTime } = require("./maps.service");
const rideModel = require("../model/ride.model");
const crypto = require("crypto");

async function getFare(pickup, destination, vehicleType) {
  if (!pickup || !destination) {
    throw new Error("Pickup and destination are required");
  }

  try {
    const distanceTime = await getDistanceAndTime(
      pickup,
      destination,
      vehicleType
    );
    console.log("Distance Time Response:", distanceTime);

    if (!distanceTime) {
      throw new Error("Unable to get distance and time data");
    }

    const distanceValue = parseFloat(distanceTime.distanceValue);
    const durationValue = parseFloat(distanceTime.durationValue);

    console.log("Distance Value (meters):", distanceValue);
    console.log("Duration Value:", durationValue);

    if (isNaN(distanceValue) || isNaN(durationValue)) {
      throw new Error("Invalid distance or duration values");
    }

    const baseFare = { auto: 30, car: 50, moto: 20 };
    const perKmRate = { auto: 10, car: 15, moto: 8 };
    const perMinuteRate = { auto: 2, car: 3, moto: 1.5 };

    const distanceInKm = distanceValue / 1000;
    const durationInMin = durationValue;

    console.log("Distance in KM:", distanceInKm);
    console.log("Duration in Minutes:", durationInMin);

    const fare = {
      auto: Math.round(
        baseFare.auto +
          distanceInKm * perKmRate.auto +
          durationInMin * perMinuteRate.auto
      ),
      car: Math.round(
        baseFare.car +
          distanceInKm * perKmRate.car +
          durationInMin * perMinuteRate.car
      ),
      moto: Math.round(
        baseFare.moto +
          distanceInKm * perKmRate.moto +
          durationInMin * perMinuteRate.moto
      ),
    };

    console.log("Calculated Fares:", fare);

    if (isNaN(fare.auto) || isNaN(fare.car) || isNaN(fare.moto)) {
      throw new Error("Fare calculation resulted in invalid values");
    }

    return {
      pickup,
      destination,
      distance: distanceTime.distance,
      duration: distanceTime.duration,
      distanceValue: distanceValue,
      durationValue: durationValue,
      fare,
    };
  } catch (error) {
    console.error("Error in getFare:", error);
    throw error;
  }
}

function getOtp(num) {
  function generateOtp(num) {
    const otp = crypto
      .randomInt(Math.pow(10, num - 1), Math.pow(10, num))
      .toString();
    return otp;
  }
  return generateOtp(num);
}

async function createRide({ pickup, destination, userId, vehicleType }) {
  if (!userId || !destination || !pickup || !vehicleType) {
    throw new Error("All fields are required");
  }

  try {
    // Get fare details
    const fareDetails = await getFare(pickup, destination, vehicleType);

    console.log("Fare Details:", fareDetails);

    // Create ride with the fare for selected vehicle type
    const ride = await rideModel.create({
      userId,
      pickup,
      destination,
      otp: getOtp(6),
      vehicleType,
      fare: fareDetails.fare[vehicleType], // ✅ Correct way to access fare
    });

    // Return ride with additional details
    return {
      ride,

      distance: fareDetails.distance,
      duration: fareDetails.duration,
      fare: fareDetails.fare[vehicleType],
      allFares: fareDetails.fare,
    };
  } catch (error) {
    console.error("Error in createRide:", error);
    throw error;
  }
}

module.exports = {
  getFare,
  createRide,
};
