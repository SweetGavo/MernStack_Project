"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserAuthToken = exports.emailHasMxRecord = exports.logout = exports.comparePasswords = exports.hashPassword = exports.generateAccountNumber = exports.tokenGeneration = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const promises_1 = __importDefault(require("dns/promises"));
const tokenGeneration = (id) => {
    return jsonwebtoken_1.default.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1hr" });
};
exports.tokenGeneration = tokenGeneration;
const generateAccountNumber = () => {
    return Math.floor(Math.random() * Math.pow(10, 10));
};
exports.generateAccountNumber = generateAccountNumber;
const hashPassword = async (plainText) => {
    const saltRounds = 10;
    return bcryptjs_1.default.hash(plainText, saltRounds);
};
exports.hashPassword = hashPassword;
const comparePasswords = async (plainText, hash) => {
    return bcryptjs_1.default.compare(plainText, hash);
};
exports.comparePasswords = comparePasswords;
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
