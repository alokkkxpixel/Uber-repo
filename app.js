const express = require("express");
const dotenv = require("dotenv");
dotenv.config(1);
const cors = require("cors");

const app = express();
app.set(".env", { path: ".env" });
app.use(cors());

app.get("/", (req, res) => {
  res.send("hlooee");
});

module.exports = app;
