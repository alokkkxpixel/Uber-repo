const { validationResult } = require("express-validator");
const userModel = require("../model/user.model");
const userService = require("../services/user.service");
const blacklistTokenModel = require("../model/blackListToken.model");

const registerUser = async (req, res, next) => {
  const errors = validationResult(req);
  // console.log("req.body ", req.body);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullname, email, password } = req.body;

  // user.model.js se userModel.hashedpassword method ko called kiya hai  for Bcrypt hash password
  const hashedPassword = await userModel.hashPassword(password);

  // UserService.creatuser called form user.service.js and create the user with Password : hashed (encrypted)
  const user = await userService.createUser({
    firstName: fullname.firstName,
    lastName: fullname.lastName,
    email,
    password: hashedPassword,
  });

  const token = user.generatedAuthToken();
  res.status(201).json({ token, user });
};

const loginUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  // console.log(email, password);

  // const isUserAlreadyExist = await userModel.findOne({ email });

  // if (isUserAlreadyExist) {
  //   return res.status(401).json({ message: "User is already exist" });
  // }
  const user = await userModel.findOne({ email: email }).select("+password");

  if (!user) {
    return res.status(401).json({ messsage: "Invaild email " });
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    return res.status(401).json({ messsage: "Invaild  password" });
  }
  const token = user.generatedAuthToken();
  res.cookie("token", token);
  res.status(200).json({ token, user });
};

const getUserProfile = async (req, res, next) => {
  res.send("user profile");
};

const logoutUser = async (req, res, next) => {
  res.clearCookie("token");
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  await blacklistTokenModel.create({ token });
  res.status(200).json({ messsage: "User successfully logout" });
};

module.exports = {
  loginUser,
  registerUser,
  getUserProfile,
  logoutUser,
};