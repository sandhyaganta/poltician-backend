const express = require("express");
const route = express.Router();
// const usercomplients = require("../models/usercomplientsModel.js");
const { json } = require("body-parser");
const jwt = require("jsonwebtoken");
const verifyToken = require("../../jwt/token.js");
const userdetailsModel = require("../models/userModel.js");
const usercomplientsModel = require("../models/usercomplientsModel.js");

route.post("/creatcomplients", (req, res) => {
  const ad = new usercomplientsModel(req.body);
  ad.save();
  res.status(201).json(ad);
});

route.get("/getcomplients",verifyToken ,async (req, res) => {
  const allcomplients = await usercomplientsModel
    .aggregate([
      {
        $lookup: {
          from: "userdetails",
          localField: "userid",
          foreignField: "_id",
          as: "complientsdetails",
        },
      },
    ])
    .then((allcomplients) => {
      res.send(allcomplients);
    })
    .catch((err) => {
      res.send(err);
    });
});

route.get("/getcomplient",async(req,res) => {
  const allcomplients=await usercomplientsModel.find();
  res.status(201).json(allcomplients); 

});

route.get("/getById/:id", async(req,res) =>{
  try{
    const complient=await usercomplientsModel.findById(req.params.id);
  res.status(201).json(complient);

  }
  catch{
    res.status(500).json({err:'complient not found'})
  }
  
 
})

module.exports = route;
