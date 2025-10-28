const { validationResult } = require("express-validator");
const rideModel = require("../model/ride.model");
const rideService = require("../services/ride.service");
const mapService = require("../services/maps.service");
const { sendMessageToSocketId } = require("../socket");
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


    const pickupCoordinates =  await mapService.getAddressCoordinate(Pickup)
    console.log("pickupCoor",pickupCoordinates)
    
   const captainsINRadius = await mapService.getCaptainsInTheRadius(pickupCoordinates.lat , pickupCoordinates.lng , 2)
   console.log("cap in radius",captainsINRadius)

    response.ride.otp = " "
  
   const rideWithUser = await  rideModel.findOne({_id:response.ride._id}).populate("userId")
   
 
    
   console.log("ride user", rideWithUser.userId)
   
    captainsINRadius.map((captain)=>{

      sendMessageToSocketId(captain.socketId,{
        event:"New-ride-available",
        data:rideWithUser
      })
    })
 





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


module.exports.confirmRide = async (req,res) => {

  const error = validationResult(req)

  
  if(!error.isEmpty()){
    return res.status(400).json({error:error.array()})
  }
    console.log("Headers:", req.headers);

  const {rideId,captainId} = req.body
   console.log("captain", captainId)
  console.log("Incoming confirm ride body:", req.body);

  try {
  
    const ride = await rideService.confirmRide(rideId, captainId)

    
     sendMessageToSocketId(ride.userId.socketId,{
      event:"ride-confirmed",
      data:ride
     })

    return res.status(200).json({ride})

 
  } catch (err) {
    console.log(err || err.message)
    return res.status(500).json({message:err.message})
    
  }

}