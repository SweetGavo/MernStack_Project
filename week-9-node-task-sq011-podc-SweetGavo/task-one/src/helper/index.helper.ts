import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import dns from "dns/promises";
import { User } from "../auth/user/types/userTypes";


export const tokenGeneration = (id:any) => {
    return jwt.sign({id}, process.env.JWT_SECRET as string, {expiresIn: "1hr"})
}

export const generateAccountNumber = () => {
    return Math.floor(Math.random() * Math.pow(10,10))
}



export const hashPassword = async (plainText: string): Promise<string> => {
    const saltRounds = 10;
    return bcrypt.hash(plainText, saltRounds);
  };
  
  export const comparePasswords = async (plainText: string, hash: string): Promise<boolean> => {
    return bcrypt.compare(plainText, hash);
  };


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
export function getUserAuthToken(user: User) {
    const { password, ...authUser } = user;
    if (secretKey) {
        return jwt.sign({...authUser, time: Date.now() }, secretKey, { expiresIn: 300 });
    }
}