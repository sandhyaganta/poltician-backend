const mongoose=require("mongoose");
const schema=mongoose.Schema;
const usercomplients=new schema(
    {
        complients:{
            type:String,
            
        },
         
       
       
          

},{
    timestamps:true,

}
);
module.exports=mongoose.model("usercomplients",usercomplients)

