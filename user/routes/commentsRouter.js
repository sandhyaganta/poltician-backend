const express=require("express");
const route=express.Router();
const userpost=require("../models/userpostModel.js");
const {json}=require('body-parser');
const jwt=require("jsonwebtoken");
const verifyToken=require('../../jwt/token.js')

route.post("/comment",(req,res)=>{
    const ad=new userpost(req.body);
    ad.save();
    res.status(201).json(ad);
});

route.get("/get/comments", async (req, res) => {
    const allposts = await userpost.find();
    res.status(201).json(allposts);
  });

  route.put("/updateById/:id",  async (req, res) => {
    const post = await userpost.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(201).json(post);
  });

module.exports = route;
