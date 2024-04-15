const express = require("express");
const route = express.Router();
const notification = require("../models/notificationModel.js");
const multer = require("multer");
const verifyToken = require("../../jwt/token.js");

const storage = multer.diskStorage({
  destination: "notifications/",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const uploads = multer({ storage });

route.post("/", uploads.single("filepath"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error:"nofile found" });
  }
  var data1 = {
    title: req.body.title,
    filepath: req.file.originalname,
    filetype: req.body.filetype,
    like: req.body.like
  };
  try {
    const vd = await notification.create(data1);
    return res.status(201).json({ vd });
  } catch (err) {
    return res.status(500).json({ err: "failed to create video" });
  }
});

route.get("/", verifyToken, async (req, res) => {
  const allnotification = await notification.find();
  res.status(200).json(allnotification);
});

route.get("/:id", verifyToken, async (req, res) => {
  try {
    const notification = await notification.findById(req.params.id);
    res.status(201).json(notification);
  } catch (err) {
    res.status(500).json({ err: "notification not found" });
  }
});

route.put("/:id", verifyToken, async (req, res) => {
  const post = await notification.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  );
  res.status(201).json(post);
});

route.delete("/:id", verifyToken, async (req, res) => {
  const notification = await notification.findByIdAndDelete(req.params.id);
  res.status(201).json(notification);
});

module.exports = route;
