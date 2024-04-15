const mongoose = require("mongoose");
const schema = mongoose.Schema;
const notificationreplay = new schema(
  {
    userid: {
      type: mongoose.Schema.Types.ObjectId,
    },
    comments: {
      type: String,
    },
    notificationid: {
      type: mongoose.Schema.Types.ObjectId,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("notificationreplay", notificationreplay);
