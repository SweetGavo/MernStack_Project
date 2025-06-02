"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserBalance = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const balances_model_1 = require("../models/balances.model");
exports.getUserBalance = (0, express_async_handler_1.default)(async (req, res) => {
    var _a;
    const userId = req.cookies.Uid || ((_a = req.user) === null || _a === void 0 ? void 0 : _a.id) || req.params.userId;
    if (!userId) {
        res.status(400).json({ message: 'User ID is required' });
        return;
    }
    const userBalance = await balances_model_1.Balance.findOne({ userId });
    console.log(`User Balance: ${userBalance}`);
    if (!userBalance) {
        res.status(404).json({ message: 'Balance not found for this user' });
        return;
    }
    const naira = `₦${userBalance.balance.toLocaleString('en-NG')}`;
    res.status(200).json({
        success: true,
        balance: naira,
        accountNumber: userBalance.accountNumber,
        userId: userBalance.userId,
    });
});
