const express=require("express");
const route=express.Router();
const userpost=require("../models/userpostModel.js");
const {json}=require('body-parser');
const jwt=require("jsonwebtoken");
const verifyToken=require('../../jwt/token.js')

route.post("/like",(req,res)=>{
    const ad=new userpost(req.body);
    ad.save();
    res.status(201).json(ad);
});

route.get("/getlike",verifyToken, async (req, res) => {
    const alllikes = await userpost.find();
    res.status(201).json(alllikes);
  });

  route.put("/updateById/:id",verifyToken,  async (req, res) => {
    const post = await userpost.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(201).json(post);
  });

module.exports = route;
