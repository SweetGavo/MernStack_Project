"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = exports.register = void 0;
const balances_model_1 = require("../../models/balances.model");
const users_model_1 = require("../../models/users.model");
const index_helper_1 = require("../../helper/index.helper");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const utils_1 = require("../../utils/utils");
//  Register
const register = async (req, res) => {
    //define user registration details
    (await (0, utils_1.validateUserSignUp)()).validateAsync({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        phone: req.body.phone,
        dob: req.body.dob,
    });
    //-- check if passwords match
    if (req.body.password !== req.body.confirmPassword) {
        res.status(400);
        throw new Error("Passwords do not match");
    }
    const { firstName, lastName, email, password, phone, dob } = req.body;
    const userExists = await users_model_1.User.find({ email: email.toLowerCase() });
    //  check if user already exists
    if (userExists.length > 0) {
        return res.status(400).send("User already exists");
    }
    const salt = await bcryptjs_1.default.genSalt(10);
    const hashedPassword = await bcryptjs_1.default.hash(password, salt);
    const user = await users_model_1.User.create({
        firstname: firstName,
        lastname: lastName,
        email: email.toLowerCase(),
        password: hashedPassword,
        phone,
        dob,
    });
    const accountNumber = (0, index_helper_1.generateAccountNumber)();
    const viewableInfo = await balances_model_1.Balance.create({
        userId: user._id,
        accountNumber: accountNumber,
        balance: 5000,
    });
    if (user) {
        const mytoken = (0, index_helper_1.tokenGeneration)(user._id);
        res.cookie("Token", mytoken);
        res.cookie("Uid", user._id);
        res.cookie("Username", user.firstName);
        // res.cookie("Balance", viewableInfo.balance);
        res.status(201).redirect("/home");
    }
};
exports.register = register;
//-- Login user
const login = async (req, res) => {
    const { email, password } = req.body;
    const body = req.body;
    await (await (0, utils_1.validateUserSignIn)()).validateAsync({
        email: body.email,
        password: body.password
    });
    const user = await users_model_1.User.find({ email: email.toLowerCase() });
    if (user.length > 0 && (await bcryptjs_1.default.compare(password, user[0].password))) {
        const userInfo = await balances_model_1.Balance.find({ userId: user[0]._id });
        const myToken = (0, index_helper_1.tokenGeneration)(user[0]._id);
        res.cookie("Token", myToken);
        res.cookie("Uid", user[0]._id);
        res.cookie("Username", user[0].firstName);
        // res.cookie("Balance", userInfo[0].balance);
        res.status(201).redirect("/home");
    }
    else {
        res.status(400).send("Invalid credentials");
    }
};
exports.login = login;
//-- Logout user
const logout = async (req, res) => {
    res.cookie("Token", "");
    res.cookie("Uid", "");
    res.cookie("Username", "");
    res.cookie("Type", "");
    res.status(201).redirect("/login");
};
exports.logout = logout;
