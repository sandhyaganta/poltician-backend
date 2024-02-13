const mongoose=require("mongoose");
const schema=mongoose.Schema;
const userdetails=new schema(
    {
        photo:{
           type:String,
        required:true,

        },
        fristname:{
            type:String,
            required:true,

        },
        lastname:{
            type:String,
            required:true,

        },
        username:{
            type:String,
            required:true,
        },
        password:{
            type:String,
            required:true,
        },
        fathername:{
            type:String,
            required:true,
        },
        mobileno:{
            type:Number,
            required:true,
        },
        caste:{
            type:String,
            required:true,
        },
        village:{
            type:String,
            required:true,

        },
        mandal:{
            type:String,
            required:true,
        },
        district:{
            type:String,
            required:true,
        }
},
{
   timestamps:true, 
}
);
module.exports=mongoose.model("userdetails",userdetails);