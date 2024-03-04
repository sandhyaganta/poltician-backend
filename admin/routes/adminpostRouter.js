const express = require("express");
const route = express.Router();
const adminpost = require("../models/adminpostModel.js");
const { json } = require("body-parser");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const verifyToken = require("../../jwt/token.js");

const storage = multer.diskStorage({
  destination: "videofiles/",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const uploads = multer({ storage });
route.post("/video", uploads.single("files"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "nofile" });
  }
  var data1 = {
    files: req.file.originalname,
    title: req.body.title,
    type:req.body.type,
    like:req.body.like,
    comments:req.body.comments,
  };
  console.log(data1, "data1");
  try {
    const vd = await adminpost.create(data1);
    return res.status(200).json(vd);
  } catch (err) {
    return res.status(500).json({ err: "failed to create video" });
  }
});
route.get("/get/posts",verifyToken, async (req, res) => {
  const allusers = await adminpost.find();
  res.status(201).json(allusers);
});

route.put("/updateById/:id",verifyToken,  async (req, res) => {
  const post = await adminpost.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  );
  res.status(201).json(post);
});



module.exports = route;
