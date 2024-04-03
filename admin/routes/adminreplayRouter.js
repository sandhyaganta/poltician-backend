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
const usercomplients = require("../../user/models/usercomplientsModel.js");
const allcomments = await usercomplients  
    .aggregate([
      {
        $lookup: {
          from: "adminreplays",
          localField: "_id",
          foreignField: "complientid",
          as: "adminreplay",
        },
      },
      {
        $match: {
          "adminreplay.complientid": userId // assuming req.params.id contains the user's ID
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


route.get("/get/allreplays",async(req,res)=>{
  const allreplays=await adminreplays.find();
  res.status(201).json(allreplays);

})




module.exports = route;
