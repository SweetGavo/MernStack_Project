"use strict";
const trans = require("mongoose");
const transactionSchema = new trans.Schema(
  {
    reference: {
      type: String,
      unique: true,
    },
    senderAccount: Number,
    amount: Number,
    receiverAccount: Number,
    transferDescription: String,
  },
  {
    timestamps: true,
  },
);
module.exports = trans.model("transaction", transactionSchema);
// const connect = () => {
//     return mongoose.connect('mongodb://localhost:27017/database');
// }
