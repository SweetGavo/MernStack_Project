"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Balance = void 0;
const mongoose_1 = require("mongoose");
const balanceSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
    },
    accountNumber: {
        type: Number,
        required: true,
        unique: true,
    },
    balance: {
        type: Number,
        default: 0,
    }
}, {
    timestamps: true,
});
exports.Balance = (0, mongoose_1.model)('Balance', balanceSchema);
