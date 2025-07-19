const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const userSchema = new mongoose.Schema({
  fullname: {
    firstName: {
      type: String,
      required: true,
      minlength: [3, "first name must be atleast 3 characters"],
    },
    lastName: {
      type: String,
      minlength: [3, "last name must be atleast 3 characters"],
    },
  },

  email: {
    type: String,
    required: true,
    unique: true,
    minlength: [5, "email must be atleast 5 characters"],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  socketId: {
    type: String,
  },
});

userSchema.methods.generatedAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
  return token;
};
userSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};


const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
