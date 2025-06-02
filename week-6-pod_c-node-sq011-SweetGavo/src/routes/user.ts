import express from 'express';
import { login, logout, signup } from '../auth/authentication';
import { requireAuth } from '../middleware/auth.middleware';
const router = express.Router();


router.post('/signup',requireAuth, signup);
router.post('/login',requireAuth, login);
router.get('/logout', logout);


export default router;