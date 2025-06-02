import Joi from "joi";
import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import dns from "dns/promises";
import { User } from "../auth/user/types/userTypes";
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
    phone_number: Joi.string().length(11).required(),
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


