const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const captainSchema = new mongoose.Schema({
  fullname: {
    firstName: {
      type: String,
      required: true,
      minLength: [3, "First name must be atleast 3 charachters"],
    },
    lastName: {
      type: String,
      minLength: [3, "Last name must be atleast 3 charachters"],
    },
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  socketId: {
    type: String,
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "inactive",
  },
  vehicle: {
    color: {
      type: String,
      required: true,
      minLength: [3, "Color name must be atleast 3 charachters"],
    },
    plate: {
      type: String,
      required: true,
      minLength: [3, "Plate must be atleast 3 charachters"],
    },
    capacity: {
      type: Number,
      required: true,
      min: [1, "Capacity must be atleast 1"],
    },
    vehicleType: {
      type: String,
      required: true,
      enum: ["car", "motorcycle", "auto"],
    },
  },
  location: {
    lat: {
      type: Number,
    },
    lng: {
      type: Number,
    },
  },
});

captainSchema.methods.generatedAuthToken = async function (params) {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });

  return token;
};

captainSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

captainSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};
const captainModel = mongoose.model("captain", captainSchema);

module.exports = captainModel;
