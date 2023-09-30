import Joi from "joi";
import jwt from "jsonwebtoken";
import {Request, Response,NextFunction } from "express";
// import { user } from "../models/users";
import dns from "dns/promises";
import { Schema } from "mongoose";

export async function validateUserTransaction() {
  return Joi.object({
    senderAccount: Joi.string().required(),
    receiverAccount: Joi.number().required(),
    amount: Joi.number().required(),
    description: Joi.string().required(),
    password: Joi.string().min(6)
      .pattern(new RegExp("^[a-zA-Z0-9]{3,1024}$"))
      .required(),
    confirmPassword: Joi.ref("password"),
  });
  
}

export async function validateUserSignUp() {
  //validate user registration details
  return Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    dob: Joi.date().required(),
    phoneNumber: Joi.string().length(11).required(),
    password: Joi.string().min(6)
      .pattern(new RegExp("^[a-zA-Z0-9]{3,1024}$"))
      .required(),
    confirmPassword: Joi.ref("password"),
  });
  
}

//-- validate user login details
export async function validateUserSignIn() {
  return Joi.object({
    email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] }
    }).required(),
    password: Joi.string().min(6)
      .pattern(new RegExp("^[a-zA-Z0-9]{3,1024}$"))
      .required(),
  });
  
}



//-- logout user
export const logout = (async function(req: Request, res: Response) {
    res.clearCookie("token");
    req.cookies = '';
    res.status(200).redirect("/");
})

//-- email Mx record check
export async function emailHasMxRecord(email: string): Promise<boolean> {
    try {
        const domain = email.split('@')[1];
        const record = await dns.resolveMx(domain);
        return true;
    } catch (error) {
        return false;
    }
}

//-- Get user secret key
const secretKey = process.env.SECRET_KEY;
export function getUserAuthToken(user: user) {
    const { password, ...authUser } = user;
    if (secretKey) {
        return jwt.sign({...authUser, time: Date.now() }, secretKey, { expiresIn: 300 });
    }
}