"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const balances_controller_1 = require("../controller/balances.controller");
const balanceRouter = express_1.default.Router();
balanceRouter.get('/:id', balances_controller_1.getUserBalance);
exports.default = balanceRouter;
