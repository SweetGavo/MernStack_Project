"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    firstName: String,
    lastname: String,
    DOB: Date,
    email: {
        type: String,
        unique: true
    },
    phone_number: {
        type: Number,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
});
module.exports = mongoose_1.default.model('user', userSchema);
// export const user = mongoose.model("userService", userSchema);
