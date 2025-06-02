import {Balance} from '../models/balances.model';
import { User } from '../models/users.model';
import { Request, Response } from "express";
import bcrypt from "bcryptjs"
import {validateUserSignIn,validateUserSignUp, } from "../utils/utils";
import { generateAccountNumber, tokenGeneration } from '../helper/index.helper';
import asyncHandler from 'express-async-handler';





export const getUserDetails = asyncHandler(async (req: Request, res:Response) => {
    const userId = req.cookies.Uid;
    const userAccountDetails = await Balance.find({userId})
    const userInfo = await User.find({_id: userId});
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


//-- Create a new user and all
export const register = async (req: Request, res: Response) => {
  try {
    // Validate input data
    await (await validateUserSignUp()).validateAsync({
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
    const userExists = await User.find({ email: email.toLowerCase() });
    if (userExists.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      firstname: firstName,
      lastname: lastName,
      email: email.toLowerCase(),
      password: hashedPassword,
      phone_number: phone_number,
      dob,
    });

    // Create initial balance account
    const getNumber = generateAccountNumber();
    
    await Balance.create({
      userId: user._id,
      accountNumber: getNumber, 
      balance: 5000,
    });

    // Generate token and set cookies
    const mytoken = tokenGeneration(user._id);
    res.cookie("Token", mytoken);
    res.cookie("Uid", user._id);
    res.cookie("Username", user.firstName);

    // Redirect to home
    res.status(201).send("Registration successful, redirecting to home...");
    console.log(`User registered successfully: ${user.firstName} , Token : ${mytoken}`);
    

  } catch (error: any) {
    console.error("Registration error:", error.message);
    res.status(500).json({ message: error.message || "Server Error" });
  }
};




//-- Login user
const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const body = req.body;
    await (await validateUserSignIn()).validateAsync({
        email: body.email,
        password: body.password
    })
console.log(`${email} ${password}`)


    const user = await User.find({ email: email.toLowerCase() });
    
    if (user.length > 0 && (await bcrypt.compare(password, user[0].password))) {
        const userInfo = await Balance.findOne({ userId: user[0]._id });

        const myToken = tokenGeneration(user[0]._id);
        res.cookie("Token", myToken);
        res.cookie("Uid", user[0]._id );
        res.cookie("Username", user[0].firstName);
        // res.cookie("Balance", (userInfo as unknown as typeof Balance)?.balance || 0); // Cast userInfo to typeof Balance type

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
   getUserDetails
    
}












