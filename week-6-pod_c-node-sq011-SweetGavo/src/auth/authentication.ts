import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
import { ISession } from './types/session';
import { hashPassword,comparePasswords } from '../utils/utility';
interface User {
    id?: string;
    _id?: string;
    email: string;
    password: string;
  }


const USERS_FILE = path.join(__dirname, '../../data/users.json');

const getUsers = () => fs.existsSync(USERS_FILE)
  ? JSON.parse(fs.readFileSync(USERS_FILE, 'utf-8'))
  : [];

  export const signup = async (req: Request, res: Response) => {
    const { email, password, confirmPassword } = req.body;
    console.log(`Signup attempt with email: ${email}`);
    
  
    if (password !== confirmPassword) {
      return res.status(400).send('Passwords do not match.');
    }
  
    const users = getUsers();
  
    if (users.find((u: any) => u.email === email)) {
      return res.status(400).send('Email already registered.');
    }
  
    const hashedPassword = await hashPassword(password);
    users.push({ email, password: hashedPassword });
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
    res.redirect('/login');
  };
  

  
  export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
  
    // Input validation
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
  
    try {
      const filePath = path.join(__dirname, '../../data/users.json');
      
      // Check if file exists
      if (!fs.existsSync(filePath)) {
        return res.status(500).json({ error: 'User database not available' });
      }
  
      const dataBuffer = fs.readFileSync(filePath);
      const users: User[] = JSON.parse(dataBuffer.toString());
        
      const user = users.find(u => u.email === email);
      
  
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials User not found!' });
      }

      const passwordMatch = await comparePasswords(password, user.password);
      

      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid credentials Password is incorrect!' });
      }
  
      // Set session data
      
      //  (req.session as ISession).id = user._id;
      //  (req.session as ISession).email = user.email;
  req.session.id  =user._id || user.id; 
  req.session.email = user.email;
      // Save session
      req.session.save((err) => {
        if (err) {
          console.error('Session save error:', err);
          return res.status(500).json({ error: 'Error saving session' });
        }
  
        console.log('User logged in:', { 
          userId: (req.session as ISession).id, 
          email: (req.session as ISession).email
        });
        
        // Return success response
        res.json({ 
          success: true, 
          message: 'Login successful',
          user: {
          Id: (req.session as ISession).id, 
          email: (req.session as ISession).email
          }
        });
      });
  
    } catch (err) {
      console.error('Login error:', err);
      res.status(500).json({ error: 'Server error during login' });
    }
  };




export const logout = (req: Request, res: Response) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
};
