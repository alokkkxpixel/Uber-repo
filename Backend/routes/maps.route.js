const express = require("express");
const { authUserMiddleware } = require("../middleware/auth.middleware");
const router = express.Router();
const { query } = require("express-validator");
const {
  getCoordinate,
  getDistaneTime,
} = require("../controller/maps.controller");

router.get(
  "/get-coordinate",
  query("address")
    .notEmpty()
    .withMessage("Address is required")
    .isLength({ min: 5 }),
  authUserMiddleware,
  getCoordinate
);

router.get(
  "/get-distance-time",
  query("origin").isString().notEmpty().isLength({ min: 5 }),
  query("destination").isString().notEmpty().isLength({ min: 5 }),
  query("modes").isString().notEmpty(),
  authUserMiddleware,
  getDistaneTime
);
module.exports = router;
