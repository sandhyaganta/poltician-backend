const mongoose = require("mongoose");
const schema = mongoose.Schema;
const complients = new schema(
  {
    title: {
      type: String,
    },
    complient: {
      type: String,
    },
    date: {
      type: String,
    },
    userid: {
      type: mongoose.Schema.Types.ObjectId,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("complient", complients);
