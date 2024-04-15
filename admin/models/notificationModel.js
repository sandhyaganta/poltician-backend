const mongoose = require("mongoose");
const schema = mongoose.Schema;
const notification = new schema(
  {
    title: {
      type: String,
    },
    filepath: {
      type: String,
    },
    filetype: {
      type: String,
      enum: ["photo", "video"],
      require: true,
    },
    like: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("notification", notification);
