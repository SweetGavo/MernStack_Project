import { model } from "mongoose";

const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
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

export const Transaction = model("Transaction", transactionSchema);

// const connect = () => {

//     return mongoose.connect('mongodb://localhost:27017/database');
// }
