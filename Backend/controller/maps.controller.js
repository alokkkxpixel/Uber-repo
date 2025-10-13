const mapService = require("../services/maps.service");
const { validationResult } = require("express-validator");

async function getCoordinate(req, res, next) {
  const { errors } = validationResult(req);

  if (!errors.length == 0) {
    res.status(400).json({ errors: errors.array() });
  }

  const { address } = req.query;
  try {
    const coordinate = await mapService.getAddressCoordinate(address);
    res.status(200).json({ coordinate });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
}

module.exports = {
  getCoordinate,
};
