const express = require("express");
const dotenv = require("dotenv");
dotenv.config(1);
const cors = require("cors");
const connectedToDB = require("./db/db");
const app = express();
const userRoutes = require("./routes/user.route");
// app.set(".env", { path: ".env" });
connectedToDB();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hlooee");
});

app.use("/users", userRoutes);


module.exports = app;
