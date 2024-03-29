const express=require("express");
const route=express.Router();
const adminData=require("../models/adminModel.js");
const {json}=require('body-parser')
const jwt=require("jsonwebtoken");
const verifyToken=require('../../jwt/token.js')
const multer=require("multer");


route.post("/create",(req,res)=>{
    const ad=new adminData(req.body);
    ad.save();
    res.status(201).json(ad);
});


route.post("/login",async(req,res) => {
    try{
        const admin=await adminData.findOne({"username":req.body.username,"password":req.body.password});
        if(!admin){
            res.status(404).json('admin not found')

        }
        const secretkey = 'my-secretkey';
    const token = jwt.sign({"username":req.body.username,"password":req.body.password},secretkey,{ expiresIn:'1h'})
    res.status(201).json({admin,token}); 

    }
    catch(err){
        res.status(500),json({err:'admin login failed'})

    }
   
   
});
module.exports=route