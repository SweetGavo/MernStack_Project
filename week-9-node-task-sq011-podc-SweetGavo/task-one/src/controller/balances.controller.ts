import asyncHandler from "express-async-handler";
import express, { Request, Response } from "express";
import { Balance } from "../models/balances.model";
import { AuthenticatedRequest } from "../models/interface/IUser.nterface";

export const getUserBalance = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.cookies.Uid || req.user?.id || req.params.id;

    if (!userId) {
      res.status(400).json({ message: "User ID is required" });
      return;
    }

    const userBalance = await Balance.findOne({ userId });

    if (!userBalance) {
      res.status(404).json({ message: "Balance not found for this user" });
      return;
    }
    const naira = `₦${userBalance.balance.toLocaleString("en-NG")}`;
    const naira1 = `₦${userBalance.balance.toLocaleString("en-NG", { minimumFractionDigits: 2 })}`;
    res.status(200).json({
      success: true,
      balance: naira1,
      accountNumber: userBalance.accountNumber,
      userId: userBalance.userId,
    });
  },
);
