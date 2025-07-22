const express = require("express");
const dotenv = require("dotenv");
dotenv.config(1);
const cors = require("cors");
const connectedToDB = require("./db/db");
const cookieParser = require("cookie-parser");
const app = express();

const userRoutes = require("./routes/user.route");
const captainRoutes = require("./routes/captain.route");

connectedToDB();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// app.set(".env", { path: ".env" });
app.get("/", (req, res) => {
  res.send("hlooee");
});

app.use("/users", userRoutes);
app.use("/captain", captainRoutes);

module.exports = app;
