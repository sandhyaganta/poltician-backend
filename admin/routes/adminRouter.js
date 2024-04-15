const express = require("express");
const route = express.Router();
const admin = require("../models/adminModel.js");
const { json } = require("body-parser");
const jwt = require("jsonwebtoken");

route.post("/", (req, res) => {
  const admins = new admin(req.body);
  admins.save();
  res.status(201).json(admins);
});

route.post("/login", async (req, res) => {
  try {
    const admins = await admin.findOne({
      username: req.body.username,
      password: req.body.password,
    });
    if (!admins) {
      res.status(404).send({ error: "admin not found" });
    }
    const secretkey = "my-secretkey";
    const token = jwt.sign(
      { username: req.body.username, password: req.body.password },
      secretkey,
      { expiresIn: "1h" }
    );
    res.status(201).json({ admins, token });
  } catch (err) {
    res.status(500), json({ err: "admin login failed" });
  }
});
module.exports = route;
