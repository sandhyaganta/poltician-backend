const express=require("express");
const route=express.Router();
const usercomplients=require("../models/usercomplientsModel.js");
const {json}=require('body-parser');
const jwt=require("jsonwebtoken");
const verifyToken=require('../../jwt/token.js')


route.post("/creatcomplients",(req,res)=>{
    const ad=new usercomplients(req.body);
    ad.save();
    res.status(201).json(ad);
});


route.get("/getById/:id", async(req,res)=>{
    try{
      const user=await usercomplients.findById(req.params.id);
      res.status(201).json(user);
    }catch(err){
      res.status(500).json({err:'complients not found'})
    }
      
      });


      module.exports = route;
