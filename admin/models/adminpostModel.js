const mongoose=require("mongoose");
const schema=mongoose.Schema;
const adminpost=new schema(
    {
        title:{
            type:String,
            
        },
         files:{
            type:String,
            
        },
        type: {
            type: String,
            enum: ['photo', 'video'],
            require: true,
          },
       like:{
        type:Number,
       }
        
          

},{
    timestamps:true,

}
);
module.exports=mongoose.model("adminpost",adminpost)

