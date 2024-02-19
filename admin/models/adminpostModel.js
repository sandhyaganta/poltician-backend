const mongoose=require("mongoose");
const schema=mongoose.Schema;
const adminpost=new schema(
    {
        name:{
            type:String,
            
        },
         video:{
            type:String,
            
        },
       
        photo:{
            type:String,
        },
          

},{
    timestamps:true,

}
);
module.exports=mongoose.model("adminpost",adminpost)

