const mongoose = require("mongoose");
const schema = mongoose.Schema;
const comments = new schema(
  {
    userid: {
      type: mongoose.Schema.Types.ObjectId,
    },
    comments: {
      type: String,
    },
    postid: {
      type: mongoose.Schema.Types.ObjectId,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("comments", comments);
