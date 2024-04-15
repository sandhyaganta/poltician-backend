const express = require("express");
const route = express.Router();
const user = require("../models/userModel.js");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const verifyToken = require("../../jwt/token.js");

const storage = multer.diskStorage({
  destination: "users/",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const uploads = multer({ storage });

route.post("/", uploads.single("photo"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "nofile" });
  }
  var data = {
    photo: req.file.filename,
    fristname: req.body.fristname,
    lastname: req.body.lastname,
    username: req.body.username,
    password: req.body.password,
    fathername: req.body.fathername,
    mobileno: req.body.mobileno,
    caste: req.body.caste,
    village: req.body.village,
    mandal: req.body.mandal,
    district: req.body.district,
  };
  try {
    const images = await user.create(data);
    return res.status(200).json({ images });
  } catch (err) {
    return res.status(500).json({ err });
  }
});

route.post("/login", async (req, res) => {
  const users = await user.findOne(req.body);
  const secretkey = "my-secretkey";
  const token = jwt.sign(
    { username: req.body.username, password: req.body.password },
    secretkey,
    { expiresIn: "1h" }
  );
  res.status(200).json({ users, token });
});

route.get("/", verifyToken, async (req, res) => {
  const allusers = await user.find();
  res.status(200).json(allusers);
});

route.get("/:id", verifyToken, async (req, res) => {
  try {
    const user = await user.findById(req.params.id);
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ err: "user not found" });
  }
});

route.put("/:id", verifyToken, async (req, res) => {
  const users = await user.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  );
  res.status(201).json(users);
});

route.delete("/:id", verifyToken, async (req, res) => {
  const users = await user.findByIdAndDelete(req.params.id);
  res.status(201).json(users);
});

module.exports = route;
