const mongoose=require("mongoose");
const schema=mongoose.Schema;
const userpost=new schema(
    {
        like:{
            type:String,
            
        },
         comments:{
            type:String,
            
        },
       
       
          

},{
    timestamps:true,

}
);
module.exports=mongoose.model("userpost",userpost)

