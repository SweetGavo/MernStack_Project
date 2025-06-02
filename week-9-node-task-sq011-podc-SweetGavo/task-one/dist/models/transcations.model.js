"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transaction = void 0;
const mongoose_1 = require("mongoose");
const mongoose = require('mongoose');
const transactionSchema = new mongoose.Schema({
    reference: {
        type: String,
        unique: true
    },
    senderAccount: Number,
    amount: Number,
    receiverAccount: Number,
    transferDescription: String
}, {
    timestamps: true
});
exports.Transaction = (0, mongoose_1.model)('Transaction', transactionSchema);
// const connect = () => {
//     return mongoose.connect('mongodb://localhost:27017/database');
// }
