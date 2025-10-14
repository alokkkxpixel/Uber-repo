const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { createRide } = require("../controller/ride.controller");
const { authUserMiddleware } = require("../middleware/auth.middleware");

router.post(
  "/create",
  authUserMiddleware,

  body("pickup")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invaild pickup Address"),
  body("destination")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invaild destination address"),
  body("vehicleType").isString().isIn(["auto", "car", "moto"]),

  createRide
);

module.exports = router;
