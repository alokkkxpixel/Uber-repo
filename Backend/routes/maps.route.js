const express = require("express");
const { authUserMiddleware } = require("../middleware/auth.middleware");
const router = express.Router();
const { query } = require("express-validator");
const { getCoordinate } = require("../controller/maps.controller");

router.get(
  "/get-coordinate",
  query("address")
    .notEmpty()
    .withMessage("Address is required")
    .isLength({ min: 5 }),
  authUserMiddleware,
  getCoordinate
);

module.exports = router;
