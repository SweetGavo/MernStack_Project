import { Document, Schema, model } from "mongoose";

export interface IBalance extends Document {
  userId: Schema.Types.ObjectId;
  accountNumber: number;
  balance: number;
}

const balanceSchema = new Schema<IBalance>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    accountNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    balance: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

export const Balance = model<IBalance>("Balance", balanceSchema);
