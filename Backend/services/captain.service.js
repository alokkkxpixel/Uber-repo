const captainModel = require("../model/captain.model");

async function createCaptainService({
  firstName,
  lastName,
  email,
  password,
  color,
  plate,
  capacity,
  vehicleType,
}) {
  if (
    (!firstName || !email || !password || !color || !plate || !capacity,
    !vehicleType)
  ) {
    throw new Error("All fields are required");
  }

  const captain = captainModel.create({
    fullname: {
      firstName,
      lastName,
    },
    email,
    password,
    vehicle: {
      color,
      plate,
      vehicleType,
      capacity,
    },
  });

  return captain;
}

module.exports = { createCaptainService };
