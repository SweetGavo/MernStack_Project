"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controller/user.controller");
const auth_1 = require("../middleware/auth");
const userAuth_auth_1 = require("../auth/user/userAuth.auth");
const userRouter = express_1.default.Router();
/* GET users listing. */
userRouter.get("/", function (req, res, next) {
  res.send("respond with a resource");
});
//create a new user
userRouter.post("/register", user_controller_1.register);
userRouter.post("/login", userAuth_auth_1.login);
userRouter.get("/logout", auth_1.protect, userAuth_auth_1.logout);
userRouter.get("/:id", auth_1.protect, user_controller_1.getUserDetails);
exports.default = userRouter;
