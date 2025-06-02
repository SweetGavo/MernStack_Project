"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const transactions_controller_1 = require("../controller/transactions.controller");
const transactionRouter = express_1.default.Router();
transactionRouter.get(
  "/:id/transaction",
  transactions_controller_1.getTransactionDetails,
);
transactionRouter.get("/:id/account", transactions_controller_1.getUserAccount);
transactionRouter.post("/transfer", transactions_controller_1.makeTransfer);
exports.default = transactionRouter;
