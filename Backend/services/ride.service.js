const { model } = require("mongoose");
const { getDistanceAndTime } = require("./maps.service");
const rideModel = require("../model/ride.model");
const crypto = require("crypto");
const { sendMessageToSocketId } = require("../socket");

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

async function createRide({ Pickup, Destination, userId, vehicleType }) {
  console.log(Pickup);
  console.log(Destination);
  console.log(userId);
  console.log(vehicleType);
  if (!userId || !Destination || !Pickup || !vehicleType) {
    throw new Error("All fields are required");
  }

  try {
    // Get fare details
    const fareDetails = await getFare(Pickup, Destination, vehicleType);

    console.log("Fare Details:", fareDetails);

    // Create ride with the fare for selected vehicle type
    const ride = await rideModel.create({
      userId,
      Pickup,
      Destination,
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

async function confirmRide(rideId,captainId) {

  if(!rideId || !captainId){
     throw new Error("rideId and captainId are required")
  }
 
   try {
     
    await rideModel.findByIdAndUpdate({_id:rideId},{
      status:"accepted",
      captain:captainId
    })
  const ride  = await rideModel.findOne({_id:rideId}).populate("userId").populate("captain")

  if(!ride){
    throw new Error ("Ride not founed")
  }
    return ride;

   } catch (err) {
  console.log(err)    
   }

}

async function startRide({rideId ,otp, captain}) {
   console.log(rideId, otp)
  if(!rideId || !otp){
    throw new Error("rideId and otp are required")
  }
 
  try {
 
    const ride =  await rideModel.findOne({_id:rideId}).populate("userId").populate("captain").select("+otp")

    if(!ride){
      throw new Error ("Ride not  founed")
    }

    if(ride.otp !== otp){
      throw new Error("Invalid otp")
    }
   console.log("Ride status:", ride.status);
    if(ride.status !== "accepted"){
      throw new Error("Ride not accepted yet")
    }

     await rideModel.findOneAndUpdate({
        _id: rideId
    }, {
        status: 'ongoing'
    })

 
     sendMessageToSocketId(ride.userId.socketId,{
      event:"ride-started",
      data:ride
     })

    
 return ride
    
  } catch (err) {
    console.log(err)
    
  }
  

}

async function endRideService({rideId , captain}) {

if (!rideId) {
        throw new Error('Ride id is required');
    }

    const ride = await rideModel.findOne({
        _id: rideId,
        captain: captain._id
    }).populate('userId').populate('captain').select('+otp');

    if (!ride) {
        throw new Error('Ride not found');
    }

    if (ride.status !== 'ongoing') {
        throw new Error('Ride not ongoing');
    }

    await rideModel.findOneAndUpdate({
        _id: rideId
    }, {
        status: 'completed'
    })

    return ride;
}
  


module.exports = {
  getFare,
  createRide,
  confirmRide,
  startRide,
  endRideService
};
