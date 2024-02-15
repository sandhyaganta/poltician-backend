const express=require("express");
const route=express.Router();
const adminData=require("../models/adminModel.js");
const {json}=require('body-parser')


route.post("/create",(req,res) =>{
    const admin=new adminData(req.body);
    admin.save();
    res.status(201).json(admin) ;
} );


route.post("/login",async(req,res) => {
    const admin=await adminData.findOne(req.body);
    res.status(201).json(admin);
});
module.exports=route