"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
async function connectDB() {
    try {
        const conn = await mongoose_1.default.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            autoIndex: true,
            useUnifiedTopology: true,
        });
        console.log('CONNECTED TO **** TRANSFER-SERVICE \n***********************************************************************');
    }
    catch (error) {
        console.error(error);
        process.exit(1);
    }
}
exports.connectDB = connectDB;
