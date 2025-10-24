const { validationResult } = require("express-validator");
const captainModel = require("../model/captain.model");
const { createCaptainService } = require("../services/captain.service");
const blacklistTokenModel = require("../model/blackListToken.model");

const registerCaptainController = async (req, res, next) => {
  console.log(req.body);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullname, email, password, vehicle } = req.body;

  const isCaptainAlreadyExist = await captainModel.findOne({ email });

  if (isCaptainAlreadyExist) {
    return res.status(401).json({ message: "Captain already exist" });
  }

  const hashedPassword = await captainModel.hashPassword(password);

  const captain = await createCaptainService({
    firstName: fullname.firstName,
    lastName: fullname.lastName,
    email,
    password: hashedPassword,
    color: vehicle.color,
    capacity: vehicle.capacity,
    vehicleType: vehicle.vehicleType,
    plate: vehicle.plate,
  });

  const token = captainModel.generatedAuthToken;

  res.status(201).json({ token, captain });
};

const loginCaptainController = async (req, res) => {
  console.log(req.body);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  const { email, password } = req.body;
  const captain = await captainModel.findOne({ email }).select("+password");

  if (!captain) {
    return res.status(400).json({ message: "invaild email or password " });
  }

  const isMatch = await captain.comparePassword(password);

  if (!isMatch) {
    return res.status(400).json({ message: "invaild email or password " });
  }

  const token = await captain.generatedAuthToken();
  res.cookie("token", token);
  console.log(token);

  res.status(200).json({ token, captain });
};

const getCaptainProfile = async (req, res) => {
  res.status(201).json({ Message: "Captain profile" });
};

const logoutCaptain = async (req, res) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  await blacklistTokenModel.create({ token });

  res.clearCookie("token");

  res.status(200).json({ Message: "logout Captain Successfully" });
};

module.exports = {
  registerCaptainController,
  loginCaptainController,
  getCaptainProfile,
  logoutCaptain,
};
