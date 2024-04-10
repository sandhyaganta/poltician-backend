const mongoose=require("mongoose");
const schema=mongoose.Schema;
const userreplay=new schema(
    {
        replay:{
            type:String,
            required:true,
            
        },
        role:{
            type:String,
            
            
        },
        date:{
            type:String,
            required:true,
            
        },
        adminreplay:{
            type:String,
            required:true,
            
        },
         
       
       
          

},{
    timestamps:true,

}
);
module.exports=mongoose.model("userreplay",userreplay)