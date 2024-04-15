const express = require("express");
const route = express.Router();
const verifyToken = require("../../jwt/token.js");
const complients = require("../models/complientsModel.js");

route.post("/", (req, res) => {
  const ad = new complients(req.body);
  ad.save();
  res.status(201).json({ ad });
});

route.get("/", async (req, res) => {
  const allcomplients = await complients.find();
  res.status(200).json({ allcomplients });
});

route.get("/:id", async (req, res) => {
  try {
    const complient = await complients.findById(req.params.id);
    res.status(200).json({ complient });
  } catch {
    res.status(500).json({ err: "complient not found" });
  }
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

route.get("/user", verifyToken, async (req, res) => {
  const allcomplients = await complients
    .aggregate([
      {
        $lookup: {
          from: "user",
          localField: "userid",
          foreignField: "_id",
          as: "complients",
        },
      },
    ])
    .then((allcomplients) => {
      res.status(200).json({ allcomplients });
    })
    .catch((err) => {
      res.status(500).json({ err: "complient not found" });
    });
});

module.exports = route;
