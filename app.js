const express = require("express");
const mongoose = require("mongoose");
const adminRoute = require("./admin/routes/adminRouter");
const complientsreplayRoute = require("./admin/routes/complientsreplayRouter");
const notificationRoute = require("./admin/routes/notificationRouter");
const complientsRoute = require("./user/routes/complientsRouter");
const notificationreplayRoute = require("./user/routes/notificationreplayRouter");
const userRoute = require("././user/routes/userRouter");
// const commentsRoute = require("./user/routes/commentsRouter");
// const userlikeRoute = require("./user/routes/likeRouter");
// const usercomplientsRoute = require("./user/routes/complientsRouter");
// const adminreplayRoute = require("./admin/routes/complientsreplayRouter");
// const forgotpasswordRoute = require("./forgotpassword/routers/Router");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
app.use(express.json());
app.use(cors());
corsOptions = {
  origin: ["http://localhost:6010"],
};
PORT = 6010;
app.listen(PORT, () => {
  console.log("server start on port 6010");
});
db_Url = "mongodb://localhost:27017/politician";
mongoose
  .connect(db_Url)
  .then(console.log("database connected"))
  .catch((err) => {
    console.log("database not connected " + err);
  });
app.use("/admin", adminRoute);
app.use("/admin/complients", complientsreplayRoute);
app.use("/admin/notification", notificationRoute);
app.use("/user/complients", complientsRoute);
app.use("/user/notification", notificationreplayRoute);
app.use("/user", userRoute);

// app.use("/post", adminpostRoute);
// app.use("/comments", commentsRoute);
// app.use("/userlike", userlikeRoute);
// app.use("/replay", adminreplayRoute);
// app.use("/", forgotpasswordRoute);
