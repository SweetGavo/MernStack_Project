"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.getUserDetails = void 0;
const balances_model_1 = require("../models/balances.model");
const users_model_1 = require("../models/users.model");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const utils_1 = require("../utils/utils");
const index_helper_1 = require("../helper/index.helper");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
exports.getUserDetails = (0, express_async_handler_1.default)(async (req, res) => {
    const userId = req.cookies.Uid;
    const userAccountDetails = await balances_model_1.Balance.find({ userId });
    const userInfo = await users_model_1.User.find({ _id: userId });
    const data = {
        title: "home",
        accountDetails: [...userAccountDetails],
        userDetails: [...userInfo],
        token: req.cookies.Token,
        uid: req.cookies.Uid,
        user: req.cookies.Username
    };
    res.status(201).render("dashboard", {
        data: data
    });
});
//-- Create a new user and all
const register = async (req, res) => {
    try {
        // Validate input data
        await (await (0, utils_1.validateUserSignUp)()).validateAsync({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phone_number: req.body.phone_number,
            email: req.body.email,
            password: req.body.password,
            confirmPassword: req.body.confirmPassword,
            dob: req.body.dob,
        });
        // Check if passwords match
        if (req.body.password !== req.body.confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }
        const { firstName, lastName, email, password, phone_number, dob } = req.body;
        // Check if user already exists
        const userExists = await users_model_1.User.find({ email: email.toLowerCase() });
        if (userExists.length > 0) {
            return res.status(400).json({ message: "User already exists" });
        }
        // Hash password
        const salt = await bcryptjs_1.default.genSalt(10);
        const hashedPassword = await bcryptjs_1.default.hash(password, salt);
        // Create user
        const user = await users_model_1.User.create({
            firstname: firstName,
            lastname: lastName,
            email: email.toLowerCase(),
            password: hashedPassword,
            phone_number: phone_number,
            dob,
        });
        // Create initial balance account
        const getNumber = (0, index_helper_1.generateAccountNumber)();
        await balances_model_1.Balance.create({
            userId: user._id,
            accountNumber: getNumber,
            balance: 5000,
        });
        // Generate token and set cookies
        const mytoken = (0, index_helper_1.tokenGeneration)(user._id);
        res.cookie("Token", mytoken);
        res.cookie("Uid", user._id);
        res.cookie("Username", user.firstName);
        // Redirect to home
        res.status(201).send("Registration successful, redirecting to home...");
        console.log(`User registered successfully: ${user.firstName} , Token : ${mytoken}`);
    }
    catch (error) {
        console.error("Registration error:", error.message);
        res.status(500).json({ message: error.message || "Server Error" });
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
        const userInfo = await balances_model_1.Balance.findOne({ userId: user[0]._id });
        const myToken = (0, index_helper_1.tokenGeneration)(user[0]._id);
        res.cookie("Token", myToken);
        res.cookie("Uid", user[0]._id);
        res.cookie("Username", user[0].firstName);
        // res.cookie("Balance", (userInfo as unknown as typeof Balance)?.balance || 0); // Cast userInfo to typeof Balance type
        res.status(201).redirect("/home");
    }
    else {
        res.status(400).send("Invalid credentials");
    }
};
//-- Logout user
const logout = async (req, res) => {
    res.cookie("Token", "");
    res.cookie("Uid", "");
    res.cookie("Username", "");
    res.cookie("Type", "");
    res.status(201).redirect("/login");
};
module.exports = {
    login,
    logout,
    register: exports.register,
    getUserDetails: exports.getUserDetails
};
