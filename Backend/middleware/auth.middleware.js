const userModel = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const captainModel = require("../model/captain.model");
const blackListToken = require("../model/blackListToken.model");
const authUserMiddleware = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ messesage: "Unauthorized" });
  }

  const isBlacklisted = await blackListToken.findOne({ token });

  if (isBlacklisted) {
    return res.status(401).json({ messesage: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findById(decoded._id);

    req.user = user;
    return next();
  } catch (err) {
    return res.status(401).json({ messesage: "Unauthorized" });
    // return res.status(401).json();
  }
};

const authCaptainMiddleware = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  if (!token || typeof token !== "string") {
    return res
      .status(401)
      .json({ message: "Unauthorized: No or invalid token" });
  }

  try {
    const isBlacklisted = await blackListToken.findOne({ token });

    if (isBlacklisted) {
      return res.status(401).json({ message: "Token is blacklisted" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const captain = await captainModel.findById(decoded._id);

    if (!captain) {
      return res.status(401).json({ message: "Captain not found" });
    }

    req.captain = captain;
    return next();
  } catch (err) {
    console.error("JWT auth error:", err);
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

module.exports = {
  authUserMiddleware,
  authCaptainMiddleware,
};
