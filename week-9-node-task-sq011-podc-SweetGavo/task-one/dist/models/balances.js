"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Balance = exports.balanceSchema = void 0;
const mongoose_1 = require("mongoose");
const mongoose = require('mongoose');
exports.balanceSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    accountNumber: {
        type: Number,
        required: true
    },
    balance: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true,
});
exports.Balance = (0, mongoose_1.model)('Balance', exports.balanceSchema);
