const mongoose=require("mongoose");
const schema=mongoose.Schema;
const usercomplients=new schema(
    {
        complients:{
            type:String,
            required:true,
            
        },
        date:{
            type:String,
            required:true,
            
        },
        userid:{
            type:mongoose.Schema.Types.ObjectId,
            
        },
            

},{
    timestamps:true,

}
);
module.exports=mongoose.model("usercomplients",usercomplients)

