const { validationResult } = require("express-validator");
const userModel = require("../model/user.model");
const userService = reqiure("../services/user.services");
module.exports.registerUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { firstName, lastName, email, password } = req.body;

  // user.model.js se userModel.hashedpassword method ko called kiya hai  for Bcrypt hash password
  const hashedPassword = await userModel.hashedPassword(password);

  // UserService.creatuser called form user.service.js and create the user with Password : hashed (encrypted)
  const user = await userService.createUser({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });
};
