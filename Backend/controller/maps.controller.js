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

async function getDistaneTime(req, res) {
  try {
    const { errors } = validationResult(req);

    if (!errors.length === 0) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { origin, destination, modes } = req.query;

    const result = await mapService.getDistanceAndTime(
      origin,
      destination,
      modes
    );

    res.status(200).json({ result });
  } catch (err) {
    console.log(err);
    throw new Error("Error fetching ");
  }
}

async function getAddressAutoComplete(req, res, next) {
  const { errors } = validationResult(req);

  if (!errors.length === 0) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { input } = req.query;

    const result = await mapService.getAddressAutoComplete(input);

    res.status(200).json({
      result,
    });
  } catch (err) {
    console.log(err);
    throw new Error("Error fetching ");

  }
}
module.exports = {
  getCoordinate,
  getDistaneTime,
  getAddressAutoComplete
};
