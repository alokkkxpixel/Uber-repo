const express = require("express");
const router = express.Router();
const { body, query } = require("express-validator");
const { createRide, getFareRide } = require("../controller/ride.controller");
const { authUserMiddleware } = require("../middleware/auth.middleware");

router.post(
  "/create",
  authUserMiddleware,

  body("Pickup")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invaild pickup Address"),
  body("Destination")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invaild destination address"),
  body("vehicleType").isString().isIn(["auto", "car", "moto"]),

  createRide
);

router.get(
  "/get-fare",
  authUserMiddleware,
  query("Pickup")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Pickup address required"),
  query("Destination")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Destination Address required"),
  getFareRide
);

module.exports = router;
