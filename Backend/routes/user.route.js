const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const userModel = require("../model/user.model");
const { authUserMiddleware } = require("../middleware/auth.middleware");
const {
  registerUser,
  loginUser,
  getUserProfile,
  logoutUser,
} = require("../controller/user.controller");

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("fullname.firstName")
      .exists({ checkFalsy: true })
      .withMessage("First name is required")
      .isLength({ min: 3 })
      .withMessage("First name must be at least 3 characters long"),

    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  registerUser
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invaiad email"),
    body("password").isLength({ min: 6 }).withMessage("password is Invaild"),
  ],
  loginUser
);

router.get("/profile", authUserMiddleware, getUserProfile);
router.get("/logout", logoutUser);
module.exports = router;
