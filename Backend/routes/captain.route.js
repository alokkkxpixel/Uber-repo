const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { authCaptainMiddleware } = require("../middleware/auth.middleware");

const {
  registerCaptainController,
  getCaptainProfile,
  loginCaptainController,
  logoutCaptain,
} = require("../controller/captain.controller");
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
    body("vehicle.color")
      .isLength({ min: 3 })
      .withMessage("color must be at least 3 characters"),
    body("vehicle.plate")
      .isLength({ min: 3 })
      .withMessage("plate must be at least 3 characters"),
    body("vehicle.capacity")
      .isLength({ min: 1 })
      .withMessage("capacity must be at least 1 characters"),
    body("vehicle.vehicleType")
      .isIn("car", "motorcycle", "auto")
      .withMessage("Invaild Type of vehicle"),
  ],
  registerCaptainController
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Inavalid Email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("password  must be atleast 6 charaters"),
  ],
  loginCaptainController
);

router.get("/profile", authCaptainMiddleware, getCaptainProfile);

router.get("/logout", authCaptainMiddleware, logoutCaptain);

module.exports = router;
