"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeTransfer = exports.getUserAccount = exports.getTransactionDetails = void 0;
const balances_model_1 = require("../models/balances.model");
const transcations_model_1 = require("../models/transcations.model");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const crypto_1 = require("crypto");
//-- handle and get transaction details
exports.getTransactionDetails = (0, express_async_handler_1.default)(async (req, res) => {
    const userId = req.cookies.Uid;
    const user = await balances_model_1.Balance.find({ userId: userId });
    console.log(`User: ${user}`);
    //-- track all debit transactions
    const debitTransactions = await transcations_model_1.Transaction.find({
        senderAccount: user.length > 0 ? user[0].accountNumber : null
    });
    //-- track all credit transactions
    const creditTransactions = await transcations_model_1.Transaction.find({
        receiverAccount: user.length > 0 ? user[0].accountNumber : null
    });
    res.status(201).send({
        message: "transactions",
        title: "Your Transaction History",
        debitTransactions: [...debitTransactions],
        creditTransactions: [...creditTransactions],
        token: req.cookies.Token,
        uid: req.cookies.Uid,
        user: req.cookies.Username
    });
});
//-- handle and get user account
exports.getUserAccount = (0, express_async_handler_1.default)(async (req, res) => {
    const userId = req.cookies.Uid;
    const user = await balances_model_1.Balance.find({ userId: userId });
    res.status(201).send({
        message: "user account",
        title: "Please Verify Your Account",
        account_no: user.length > 0 ? user[0].accountNumber : null,
        token: req.cookies.Token,
        user: req.cookies.Username
    });
});
exports.makeTransfer = (0, express_async_handler_1.default)(async (req, res) => {
    const { senderAccount, receiverAccount, amount, transferDescription } = req.body;
    if (!senderAccount || !receiverAccount || !amount || amount <= 0) {
        res.status(400).json({ message: 'Invalid input.' });
        return;
    }
    const [sender, receiver] = await Promise.all([
        balances_model_1.Balance.findOne({ accountNumber: senderAccount }),
        balances_model_1.Balance.findOne({ accountNumber: receiverAccount })
    ]);
    if (!sender || !receiver) {
        res.status(404).json({ message: !sender ? 'Sender account not found.' : 'Receiver account not found.' });
        return;
    }
    if (sender.balance < amount) {
        res.status(400).json({ message: 'Insufficient balance.' });
        return;
    }
    sender.balance -= amount;
    receiver.balance += amount;
    await Promise.all([sender.save(), receiver.save()]);
    const transaction = await transcations_model_1.Transaction.create({
        reference: (0, crypto_1.randomUUID)(),
        senderAccount,
        receiverAccount,
        amount,
        transferDescription,
    });
    res.status(201).json({
        success: true,
        message: 'Transfer completed successfully.',
        transaction,
    });
});
