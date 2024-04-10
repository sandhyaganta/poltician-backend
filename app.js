const express=require("express");
const mongoose=require("mongoose");
const bodyParser = require("body-parser")
const userRoute=require("././user/routes/userRouter")
const adminRoute=require("./admin/routes/adminRouter")
const adminpostRoute=require("./admin/routes/adminpostRouter")
const commentsRoute=require("./user/routes/commentsRouter")
const userlikeRoute=require("./user/routes/likeRouter")
const usercomplientsRoute=require("./user/routes/complientsRouter")
const adminreplayRoute=require("./admin/routes/adminreplayRouter")
const forgotpasswordRoute=require("./forgotpassword/routers/Router")

const app=express();
const cors=require("cors");
const dotenv=require("dotenv");
dotenv.config();


app.use(express.json());
app.use(cors());

corsOptions={
    origin:["http://localhost:6010"],
};
PORT=6010;
app.listen(PORT,() => {
    console.log("server start on port 6000");
})
db_Url="mongodb://localhost:27017/politicianback-end";

mongoose
.connect(db_Url)
.then(console.log("db connected"))
.catch((err) => {
    console.log("db not connected");
});


app.use("/user",userRoute)
app.use("/admin",adminRoute)
app.use("/post",adminpostRoute)
app.use("/comments",commentsRoute)
app.use("/userlike",userlikeRoute)
app.use("/complients",usercomplientsRoute)
app.use("/replay",adminreplayRoute)
app.use("/",forgotpasswordRoute)


