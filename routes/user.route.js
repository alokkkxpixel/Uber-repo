const express = require("express");
const router = express.Router();
const { validationResult, body } = require("express-validator");
const userModel = require("../model/user.model");
const { registerUser } = require("../controller/user.controller");

router.post("/register", [
  body("email").isEmail().withMessage("Inavaild Email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at 6 charaster long"),
  body("fullname.firstName")
    .isLength({ min: 3 })
    .withMessage("first name must be 3 charasters long"),
]);

module.exports = router;
