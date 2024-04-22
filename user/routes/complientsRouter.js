const express = require("express");
const mongoose = require("mongoose");
const route = express.Router();
const verifyToken = require("../../jwt/token.js");
const complients = require("../models/complientsModel.js");
const complientsreplay = require("../../admin/models/complientsreplayModel.js");

route.post("/", (req, res) => {
  const ad = new complients(req.body);
  ad.save();
  res.status(201).json({ ad });
});

route.get("/", verifyToken,async (req, res) => {
  const allcomplients = await complients.find();
  res.status(200).json({ allcomplients });
});

route.get("/:id", verifyToken,async (req, res) => {
  try {
    const complient = await complients.find({userid: req.params.id});
    res.status(200).json( complient );
  } catch {
    res.status(500).json({ err: "complient not found" });
  }
});

route.get("/all/:id", verifyToken,async (req, res) => {
  const complientsid = new mongoose.Types.ObjectId(req.params.id);
  console.log(complientsid,'complientsid');
  const allcomplients = await complients
    .aggregate([
      {
        $lookup: {
          from: "complientsreplays",
          localField: "_id",
          foreignField: "complientsid",
          as: "complientsreplay",
        },
      },
      {
        $match: {
          "complientsreplay.complientsid": complientsid, 
        },
      },
    ]);
    res.status(200).json( allcomplients );
});

route.put("/:id", verifyToken, async (req, res) => {
  const complient = await complients.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  );
  res.status(201).json(complient);
});

route.delete("/:id", verifyToken, async (req, res) => {
  const complient = await complients.findByIdAndDelete(req.params.id);
  res.status(201).json(complient);
});

module.exports = route;
