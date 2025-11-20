const express = require("express");
const { authUserMiddleware } = require("../middleware/auth.middleware");
const router = express.Router();
const { query } = require("express-validator");
const {
  getCoordinate,
  getDistaneTime,
  getAddressAutoComplete,
} = require("../controller/maps.controller");
const userModel = require("../model/user.model");

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

router.get(
  "/get-suggestions",
  query("input").isString().notEmpty().isLength({ min: 2 }),
  authUserMiddleware,
  getAddressAutoComplete
);
router.post("/update-location", async (req, res) => {
  const { lat, lng, userId } = req.body;

  await userModel.updateOne({ _id: userId }, { location: { lat, lng } });

  res.status(200).json({ success: true });
});

module.exports = router;
