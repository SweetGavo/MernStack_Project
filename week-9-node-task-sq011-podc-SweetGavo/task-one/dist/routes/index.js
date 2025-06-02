"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const transactions_controller_1 = require("../controller/transactions.controller");
const router = express_1.default.Router();
/* GET home page. */
// router.get("/", getUserDetails);
// router.get("/home",);
router.get(
  "/users/:id/transactions",
  auth_1.protect,
  transactions_controller_1.getTransactionDetails,
);
router.get(
  "/users/:id/account",
  auth_1.protect,
  transactions_controller_1.getUserAccount,
);
exports.default = router;
