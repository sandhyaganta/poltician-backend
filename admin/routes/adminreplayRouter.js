const express = require("express");
const mongoose = require('mongoose');
const route = express.Router();
const adminreplays = require("../models/adminreplayModel.js");
const usercomplients = require("../../user/models/usercomplientsModel.js");
const { json } = require("body-parser");
const jwt = require("jsonwebtoken");
const verifyToken = require("../../jwt/token.js");

route.post("/creatreplay", (req, res) => {
  const ad = new adminreplays(req.body);
  ad.save();
  res.status(201).json(ad);
});

route.get("/getreplay/:id",verifyToken, async (req, res) => {
  console.log(req.params.id, "req.params.id");
  const userId = new mongoose.Types.ObjectId(req.params.id);
  const allcomments = await adminreplays
    .aggregate([
      {
        $lookup: {
          from: "usercomplients",
          localField: "complientid",
          foreignField: "_id",
          as: "usercomplients",
        },
      },
      {
        $match: {
          "usercomplients.userid": userId // assuming req.params.id contains the user's ID
        }
      }
    ])
    .then((allcomments) => {
      res.send(allcomments);
    })
    .catch((err) => {
      res.send(err);
    });
});

module.exports = route;
