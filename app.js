const express = require("express");
const dotenv = require("dotenv");
dotenv.config(1);
const cors = require("cors");
const connectedToDB = require("./db/db");
const app = express();
app.set(".env", { path: ".env" });
connectedToDB();
app.use(cors());



app.get("/", (req, res) => {
  res.send("hlooee");
});

module.exports = app;
