const express = require("express");
const mongoose = require("mongoose");
const route = express.Router();
const complientsreplay = require("../models/complientsreplayModel.js");
const complients = require("../../user/models/complientsModel.js");
const verifyToken = require("../../jwt/token.js");

route.post("/", (req, res) => {
  const ad = new complientsreplay(req.body);
  ad.save();
  res.status(201).json({ad});
});

route.get("/", async (req, res) => {
  const allreplays = await complientsreplay.find();
  res.status(200).json(allreplays);
});

route.get("/:id", verifyToken, async (req, res) => {
  try {
    const complients = await complientsreplay.findById(req.params.id);
    res.status(201).json(complients);
  } catch (err) {
    res.status(500).json({ err: "user not found" });
  }
});

route.put("/:id", verifyToken, async (req, res) => {
  const complients = await complientsreplay.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  );
  res.status(201).json(complients);
});

route.delete("/:id", verifyToken, async (req, res) => {
  const complients = await complientsreplay.findByIdAndDelete(req.params.id);
  res.status(201).json(complients);
});

route.get("/replay/:id", verifyToken, async (req, res) => {
  const userId = new mongoose.Types.ObjectId(req.params.id);
  const allcomplients = await complients
    .aggregate([
      {
        $lookup: {
          from: "complientsreplay",
          localField: "_id",
          foreignField: "complientid",
          as: "complients",
        },
      },
      {
        $match: {
          "complientsreplay.complientid": userId, // assuming req.params.id contains the user's ID
        },
      },
    ])
    .then((allcomments) => {
      res.send(allcomments);
    })
    .catch((err) => {
      res.send(err);
    });
});

module.exports = route;
