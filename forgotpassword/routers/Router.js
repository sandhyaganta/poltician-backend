const express=require("express");
const route=express.Router();
const cors=require('cors');
const sendmail=require('../../utils/email');
const password=require('../models/Model');

let corsoptions={
    origin:['http://localhost:4000']
}

route.post('/create',cors(corsoptions),(req,res)=>{
    const user=new password(req.body)
    user.save();
    res.status(201).json(user)

});

route.post('/login',cors(corsoptions),async(req,res) => {
    const user=await password.findOne(req.body);
    if(user){
        res.status(201).json(user);
    }else{
        res.status(500).json('user login failed');
    }
});

route.post('/reset-password',sendmail,cors(corsoptions),async(req,res)=>{
    const email=req.body.email

    try{
        console.log(email);
        await sendmail(email,"password reset")
        res.status(200).json('email sent')

    }
    catch(error){
        res.status(500).json('an error occured')
        console.log(error);

    }
});

route.put('/edit-password/:id',cors(corsoptions),async(req,res)=>{
    const pwt=await password.findByIdAndUpdate(req.params.id,req.body)
    console.log(pwt);
    res.status(201).json(pwt)
});

route.get('/getuser/:id',cors(corsoptions),async(req,res) =>{
    try{
    const user=await password.findById(req.params.id)
    res.status(200).json(user);
    }
    catch{
        res.status(500).json({error:'user not found'});

    }

});

module.exports=route;