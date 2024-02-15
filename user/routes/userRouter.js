const express=require("express");
const route=express.Router();
const userData=require("../models/userModel.js");
const {json}=require('body-parser');
const multer=require("multer");


const storage=multer.diskStorage({
    destination:"photos/",
    filename:(req, file, cb) =>{
        cb(null, file.originalname);
    },
});

const uploads=multer({storage});


route.post("/create",uploads.single("photo"), async( req,res) => {
    if(!req.file){
        return res.status(400).json({error:"nofile"});
    }
    var data={
        photo:req.file.filename,
        fristname:req.body.fristname,
        lastname:req.body.lastname,
        username:req.body.username,
        password:req.body.password,
        fathername:req.body.fathername,
        mobileno:req.body.mobileno,
        caste:req.body.caste,
        village:req.body.village,
        mandal:req.body.mandal,
        district:req.body.district,
    };
    try{
        const images=await userData.create(data);
        return res.status(200).json(images);   
    }
    catch(err){
        return res.status(500).json({err});

    }
});

route.get("/getById/:id", async(req,res)=>{
    const user=await userData.findById(req.params.id);
    res.status(201).json(user);
    });


    route.put("/updateById/:id",  async (req, res) => {
        const users = await userData.findByIdAndUpdate(
          req.params.id,
          { $set: req.body },
          { new: true }
        );
        res.status(201).json(users);
      });

      route.delete("/deleteById/:id",  async (req, res) => {
        const users = await userData.findByIdAndDelete(req.params.id);
        res.status(201).json(users);
      });

      route.post("/login",async(req,res) => {
        const users = await userData.findOne(req.body);
        res.status(201).json(users);

      })
       

      route.get("/get/users", async (req, res) => {
        const allusers = await userData.find();
        res.status(201).json(allusers);
      });

    module.exports = route;
  
  
