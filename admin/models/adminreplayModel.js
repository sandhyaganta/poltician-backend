const mongoose=require("mongoose");
const schema=mongoose.Schema;
const adminreplay=new schema(
    {
        replay:{
            type:String,
            required:true,
            
        },
        date:{
            type:String,
            required:true,
            
        },
        complientid:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            
        },
         
       
       
          

},{
    timestamps:true,

}
);
module.exports=mongoose.model("adminreplay",adminreplay)