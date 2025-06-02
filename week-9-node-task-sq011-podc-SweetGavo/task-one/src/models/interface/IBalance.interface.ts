import { Schema } from "mongoose";



export interface IBalance extends Document {
    userId: Schema.Types.ObjectId;
    accountNumber: number;
    balance: number;
  }


  