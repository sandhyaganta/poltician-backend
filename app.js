const express=require("express");
const mongoose=require("mongoose");

const app=express();
const cors=require("cors");
const dotenv=require("dotenv");
dotenv.config();


app.use(express.json());
app.use(cors());

corsOptions={
    origin:["http://localhost:6000"],
};
PORT=6000;

db_Url="mongodb://localhost:27017/politicianback-end";

mongoose
.connect(db_Url)
.then(console.log("db connected"))
.catch((err) => {
    console.log("db not connected");
});


app.listen(PORT,() => {
    console.log("server start on port 6000");
})