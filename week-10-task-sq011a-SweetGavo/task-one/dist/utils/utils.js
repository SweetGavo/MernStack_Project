"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserAuthToken = exports.emailHasMxRecord = exports.logout = exports.validateUserSignIn = exports.validateUserSignUp = exports.validateUserTransaction = void 0;
const joi_1 = __importDefault(require("joi"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// import { user } from "../models/users";
const promises_1 = __importDefault(require("dns/promises"));
async function validateUserTransaction() {
    return joi_1.default.object({
        senderAccount: joi_1.default.string().required(),
        receiverAccount: joi_1.default.number().required(),
        amount: joi_1.default.number().required(),
        description: joi_1.default.string().required(),
        password: joi_1.default.string().min(6)
            .pattern(new RegExp("^[a-zA-Z0-9]{3,1024}$"))
            .required(),
        confirmPassword: joi_1.default.ref("password"),
    });
}
exports.validateUserTransaction = validateUserTransaction;
async function validateUserSignUp() {
    //validate user registration details
    return joi_1.default.object({
        firstName: joi_1.default.string().required(),
        lastName: joi_1.default.string().required(),
        email: joi_1.default.string().email().required(),
        dob: joi_1.default.date().required(),
        phoneNumber: joi_1.default.string().length(11).required(),
        password: joi_1.default.string().min(6)
            .pattern(new RegExp("^[a-zA-Z0-9]{3,1024}$"))
            .required(),
        confirmPassword: joi_1.default.ref("password"),
    });
}
exports.validateUserSignUp = validateUserSignUp;
//-- validate user login details
async function validateUserSignIn() {
    return joi_1.default.object({
        email: joi_1.default.string().email({
            minDomainSegments: 2,
            tlds: { allow: ["com", "net"] }
        }).required(),
        password: joi_1.default.string().min(6)
            .pattern(new RegExp("^[a-zA-Z0-9]{3,1024}$"))
            .required(),
    });
}
exports.validateUserSignIn = validateUserSignIn;
//-- logout user
exports.logout = (async function (req, res) {
    res.clearCookie("token");
    req.cookies = '';
    res.status(200).redirect("/");
});
//-- email Mx record check
async function emailHasMxRecord(email) {
    try {
        const domain = email.split('@')[1];
        const record = await promises_1.default.resolveMx(domain);
        return true;
    }
    catch (error) {
        return false;
    }
}
exports.emailHasMxRecord = emailHasMxRecord;
//-- Get user secret key
const secretKey = process.env.SECRET_KEY;
function getUserAuthToken(user) {
    const { password, ...authUser } = user;
    if (secretKey) {
        return jsonwebtoken_1.default.sign({ ...authUser, time: Date.now() }, secretKey, { expiresIn: 300 });
    }
}
exports.getUserAuthToken = getUserAuthToken;
