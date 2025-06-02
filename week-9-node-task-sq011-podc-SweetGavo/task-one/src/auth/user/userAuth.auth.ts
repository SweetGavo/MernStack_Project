import { Balance } from "../../models/balances.model";
import { User } from "../../models/users.model";
import { generateAccountNumber, tokenGeneration } from "../../helper/index.helper";
import { Request, Response } from "express";
import bcrypt from "bcryptjs"
import {validateUserSignIn,validateUserSignUp, } from "../../utils/utils";
import jwt from "jsonwebtoken";



    //  Register
export const register = async (req: Request, res: Response) => {
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
      const userExists = await User.find({ email: email.toLowerCase() });
      //  check if user already exists
      if (userExists.length > 0) {
        return res.status(400).send("User already exists");
      }
  
      const salt = await bcrypt .genSalt(10)
      const hashedPassword = await bcrypt.hash(password, salt)
  
      const user = await User.create({
      firstname: firstName,
      lastname: lastName,
      email: email.toLowerCase(),
      password: hashedPassword,
      phone,
      dob,
    });
  
  
    
    const accountNumber = generateAccountNumber();
  
    await Balance.create({
      userId: user._id,
      accountNumber: accountNumber,
      balance: 5000,
    });
        
  
    if (user) {
      const mytoken = tokenGeneration(user._id);
      res.cookie("Token", mytoken);
      res.cookie("Uid", user._id);
      res.cookie("Username", user.firstName);
      // res.cookie("Balance", viewableInfo.balance);
      res.status(201).redirect("/home");
    }
  }
  
  //-- Login user
  export const login = async (req: Request, res: Response) => {
      const { email, password } = req.body;
      const body = req.body;
      await (await validateUserSignIn()).validateAsync({
          email: body.email,
          password: body.password
      })
  
      const user = await User.find({ email: email.toLowerCase() });
      
      if (user.length > 0 && (await bcrypt.compare(password, user[0].password))) {
          const userInfo = await Balance.find({ userId: user[0]._id })
  
          const myToken = tokenGeneration(user[0]._id);
          res.cookie("Token", myToken);
          res.cookie("Uid", user[0]._id );
          res.cookie("Username", user[0].firstName);
          // res.cookie("Balance", userInfo[0].balance);
  
          res.status(201).redirect("/home");
      } else {
          res.status(400).send("Invalid credentials");
      }
  }    
  
  //-- Logout user
  export const logout = async (req: Request, res: Response) => {
      res.cookie("Token", "");
      res.cookie("Uid", "");
      res.cookie("Username", "");
      res.cookie("Type", "");
  
      res.status(201).redirect("/login")
  }

//-- Verify authentication
export const verifyAuth = async (req: Request, res: Response) => {
    const token = req.cookies.Token;
    
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    try {
        if (process.env.JWT_SECRET) {
            await jwt.verify(token, process.env.JWT_SECRET);
            res.status(200).json({ message: "Token is valid" });
        } else {
            res.status(500).json({ message: "JWT_SECRET not configured" });
        }
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
}