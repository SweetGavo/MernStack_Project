import express from "express";
import { register ,getUserDetails } from "../controller/user.controller"
import { protect } from "../middleware/auth";
import { login, logout, verifyAuth } from "../auth/user/userAuth.auth";


const userRouter = express.Router();
/* GET users listing. */
userRouter.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


//create a new user
userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.get('/logout', protect, logout);
userRouter.get('/:id', protect, getUserDetails);
userRouter.get('/auth/verify', verifyAuth);




export default userRouter;

