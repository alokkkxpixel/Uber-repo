const userModel = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const blackListToken = require("../model/blackListToken.model");
const authUserMiddleware = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ messesage: "Unauthorized" });
  }

  const isBlacklisted = await userModel.findOne({ token });

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
    return res.status(401).json();
  }
};

module.exports = {
  authUserMiddleware,
};
