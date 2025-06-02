import { Balance } from "../models/balances.model";
import { Transaction } from "../models/transcations.model";
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { randomUUID } from "crypto";

//-- handle and get transaction details
export const getTransactionDetails = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.params.id;
    const user = await Balance.findOne({ userId: userId }); // Use findOne, not find

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    // Get all debit transactions (where this user is the sender)
    const debitTransactions = await Transaction.find({
      senderAccount: user.accountNumber || "N/A",
    });

    // Get all credit transactions (where this user is the receiver)
    const creditTransactions = await Transaction.find({
      receiverAccount: user.accountNumber,
    });

    res.status(200).json({
      debitTransactions,
      creditTransactions,
      accountNumber: user.accountNumber,
      userId: user.userId,
    });
  },
);

//-- handle and get user account
export const getUserAccount = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.cookies.Uid;
    const user = await Balance.find({ userId: userId });

    res.status(201).send({
      message: "user account",
      title: "Please Verify Your Account",
      account_no: user.length > 0 ? user[0].accountNumber : null,
      token: req.cookies.Token,
      user: req.cookies.Username,
    });
  },
);

export const makeTransfer = asyncHandler(
  async (req: Request, res: Response) => {
    const { senderAccount, receiverAccount, amount, transferDescription } =
      req.body;

    if (!senderAccount || !receiverAccount || !amount || amount <= 0) {
      res.status(400).json({ message: "Invalid input." });
      return;
    }

    const [sender, receiver] = await Promise.all([
      Balance.findOne({ accountNumber: senderAccount }),
      Balance.findOne({ accountNumber: receiverAccount }),
    ]);

    if (!sender || !receiver) {
      res
        .status(404)
        .json({
          message: !sender
            ? "Sender account not found."
            : "Receiver account not found.",
        });
      return;
    }

    // Convert balances to numbers explicitly
    const senderBalance = Number(sender.balance);
    const receiverBalance = Number(receiver.balance);
    const transferAmount = Number(amount);

    // Check balance (now using numeric comparison)
    if (senderBalance < transferAmount) {
      res.status(400).json({ message: "Insufficient balance." });
      return;
    }

    // Update balances (numeric operation)
    sender.balance = senderBalance - transferAmount;
    receiver.balance = receiverBalance + transferAmount;
    await Promise.all([sender.save(), receiver.save()]);

    await Transaction.create({
      reference: randomUUID(),
      senderAccount,
      receiverAccount,
      amount,
      transferDescription,
    });

    res.status(201).json({
      success: true,
      message: "Transfer completed successfully.",
    });
  },
);
