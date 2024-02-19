const express=require("express");
const route=express.Router();
const adminpost=require("../models/adminpostModel.js");
const {json}=require('body-parser');
const multer=require("multer");
const jwt=require("jsonwebtoken");
const verifyToken=require('../../jwt/token.js')



const storage=multer.diskStorage({
    destination:"photos/",
    filename:(req,file,cb) =>{
        cb(null,file.originalname);
    }

});
const uploads=multer({storage});

route.post("/photo",uploads.single("photo"),async(req,res) =>{
    if(!req.file){
        return res.status(400).json({error:"nofile"});
    }
    var data={
       
        photoname:req.body.photoname,
        photo:req.file.originalname,
        comments:req.body.comments,
        
    };
    try{
        const images=await adminpost.create(data);
        return res.status(200).json(images);

    }
    catch(err){
        return res.status(500).json({err});

    }

});




const storage1=multer.diskStorage({
    destination:"vedieos/",
    filename:(req,file,cb) =>{
        cb(null,file.originalname);
    }

});
const uploads1=multer({storage1});


route.post("/video",uploads1.single("video"),async(req,res) =>{
    if(!req.file){
        return res.status(400).json({error:"nofile"});
    }
    var data1={
        vedieo:req.file.originalname,
        vedieoname:req.body.vedieoname,
        comments:req.body.comments,
       
          
    };
    try{
        const vd=await adminpost.create(data1);
        return res.status(200).json(vd);
    }
    catch(err){
        return res.status(500).json({err:"failed to create video"});

    }

    
} );

route.get("/get/posts", async (req, res) => {
    const allusers = await adminpost.find();
    res.status(201).json(allusers);
  });

module.exports=route