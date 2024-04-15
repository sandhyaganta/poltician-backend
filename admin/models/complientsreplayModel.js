const mongoose = require("mongoose");
const schema = mongoose.Schema;
const complientsreplay = new schema(
  {
    replay: {
      type: String,
      required: true,
    },
    role: {
      type: String,
    },
    date: {
      type: String,
      required: true,
    },
    complientsid: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    roleid: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("complientsreplay", complientsreplay);
