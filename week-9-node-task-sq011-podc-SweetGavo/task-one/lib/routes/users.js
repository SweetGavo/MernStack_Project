"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const { login, logout, register, getUserDetails, getTransactionDetails, getUserAccount } = require("../controller/userController");
const { protect } = require("../middleware/auth");
/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});
//create a new user
router.post('/users/register', register);
router.post('/users/login', login);
router.get('/users/logout', protect, logout);
router.get('/users/:id', protect, getUserDetails);
router.get('/users/:id/transactions', protect, getTransactionDetails);
router.get('/users/:id/account', protect, getUserAccount);
exports.default = router;
