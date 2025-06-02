import express from "express";
import { protect } from "../middleware/auth";
import { getTransactionDetails, getUserAccount, makeTransfer } from "../controller/transactions.controller";

const transactionRouter = express.Router();

// Protect all transaction routes
transactionRouter.get('/:id/transaction', protect, getTransactionDetails);
transactionRouter.get('/:id/account', protect, getUserAccount);
transactionRouter.post('/transfer', protect, makeTransfer);

export default transactionRouter;
