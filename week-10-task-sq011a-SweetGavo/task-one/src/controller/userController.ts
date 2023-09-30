const balance = require('../models/balances');
const transaction = require('../models/transcations');
const userService = require('../models/users');
const asyncHandler = require('express-async-handler');
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import bcrypt from "bcryptjs"

import {validateUserSignIn,validateUserSignUp, } from "../utils/utils";
import { Types } from "mongoose";
import { userInfo } from "os";
const { v4: uuidv4 } = require("uuid");

//  signin Token
const tokenGeneration = (id: Types.ObjectId) => {
    return jwt.sign({id}, process.env.JWT_SECRET as string, {expiresIn: "1hr"})
}

const generateAccountNumber = () => {
    return Math.floor(Math.random() * Math.pow(10,10))
}

const getUserDetails = asyncHandler(async (req: Request, res:Response) => {
    const userId = req.cookies.Uid;
    const userAccountDetails = await balance.find({userId})
    const userInfo = await userService.find({_id: userId});
    const data = {
        title: "home",
        accountDetails: [...userAccountDetails],
        userDetails: [...userInfo],
        token: req.cookies.Token,
        uid: req.cookies.Uid,
        user: req.cookies.Username
    }
    res.status(201).render("dashboard", {
        data:data
    });

})

        
//-- handle and get transaction details
const getTransactionDetails = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.cookies.Uid;
    const user = await balance.find({userId: userId});

    //-- track all debit transactions
    const debitTransactions = await transaction.find({
        senderAccount: user[0].accountNumber    
    });
    
    //-- track all credit transactions
    const creditTransactions = await transaction.find({
        receiverAccount: user[0].accountNumber
    });

    res.status(201).render("transactions", {
        title: "Your Transaction History",
        debitTransactions: [...debitTransactions],
        creditTransactions: [...creditTransactions],
        token: req.cookies.Token,
        uid: req.cookies.Uid,
        user: req.cookies.Username
    })
})

//-- handle and get user account
const getUserAccount = asyncHandler(async(req: Request, res: Response) => {
    const userId = req.cookies.Uid;
    const user = await balance.find({userId: userId});

    res.status(201).render("account", {
        title: "Please Verify Your Account",
        account_no: user[0].accountNumber,
        token: req.cookies.Token,
        user: req.cookies.Username
    })
})

//-- Create a new user and all
  const register = async (req: Request, res: Response) => {
  //define user registration details
     (await validateUserSignUp()).validateAsync({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        phone: req.body.phone,
        dob: req.body.dob,
  })

  //-- check if passwords match
  if (req.body.password !== req.body.confirmPassword) {
    res.status(400);
    throw new Error("Passwords do not match")
  }

    const { firstName, lastName, email, password, phone, dob } = req.body;
    const userExists = await userService.find({ email: email.toLowerCase() });
    //  check if user already exists
    if (userExists.length > 0) {
      return res.status(400).send("User already exists");
    }

    const salt = await bcrypt .genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await userService.create({
    firstname: firstName,
    lastname: lastName,
    email: email.toLowerCase(),
    password: hashedPassword,
    phone,
    dob,
  });


  const accountNumber = generateAccountNumber();

  const viewableInfo = await balance.create({
    userId: user._id,
    accountNumber: accountNumber,
    balance: 5000,
  });
      

  if (user) {
    const mytoken = tokenGeneration(user._id);
    res.cookie("Token", mytoken);
    res.cookie("Uid", user._id);
    res.cookie("Username", user.firstname);
    res.cookie("Balance", viewableInfo.balance);
    res.status(201).redirect("/home");
  }
}

//-- Login user
const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const body = req.body;
    await (await validateUserSignIn()).validateAsync({
        email: body.email,
        password: body.password
    })

    const user = await userService.find({ email: email.toLowerCase() });
    
    if (user.length > 0 && (await bcrypt.compare(password, user[0].password))) {
        const userInfo = await balance.find({ userId: user[0]._id })

        const myToken = tokenGeneration(user[0]._id);
        res.cookie("Token", myToken);
        res.cookie("Uid", user[0]._id );
        res.cookie("Username", user[0].firstname);
        res.cookie("Balance", userInfo[0].balance);

        res.status(201).redirect("/home");
    } else {
        res.status(400).send("Invalid credentials");
    }
}    

//-- Logout user
const logout = async (req: Request, res: Response) => {
    res.cookie("Token", "");
    res.cookie("Uid", "");
    res.cookie("Username", "");
    res.cookie("Type", "");

    res.status(201).redirect("/login")
}

module.exports = {
    login,
    logout,
    register,
    getUserDetails,
    getTransactionDetails,
    getUserAccount,
    
}












