const express = require("express");
const router = express.Router();
const { body, query } = require("express-validator");
const { createRide, getFareRide, confirmRide, startRide, endRide } = require("../controller/ride.controller");
const { authUserMiddleware, authCaptainMiddleware } = require("../middleware/auth.middleware");

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
router.post("/confirm",
 authCaptainMiddleware,
 
 body("rideId").isString(),
 

 confirmRide

)

router.get("/start-ride",
  authCaptainMiddleware,
  query("rideId").isString().notEmpty(),
  query("otp").notEmpty().isLength({min:3}),
  startRide
)


router.post("/end-ride",
  authCaptainMiddleware,
  body("rideId").isMongoId().withMessage("Invalid ride id"),
  endRide
)
module.exports = router;
