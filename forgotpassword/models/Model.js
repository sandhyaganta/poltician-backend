const mongoose=require("mongoose");
const schema=mongoose.Schema;

const modal=new schema({
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        
    },
    confirmpassword:{
        type:String,

    },

},{
    timestamps:true

}
);
module.exports=mongoose.model("modal",modal)