"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUserSignIn =
  exports.validateUserSignUp =
  exports.validateUserTransaction =
    void 0;
const joi_1 = __importDefault(require("joi"));
async function validateUserTransaction() {
  return joi_1.default.object({
    senderAccount: joi_1.default.string().required(),
    receiverAccount: joi_1.default.number().required(),
    amount: joi_1.default.number().required(),
    description: joi_1.default.string().required(),
    password: joi_1.default
      .string()
      .min(6)
      .pattern(new RegExp("^[a-zA-Z0-9]{3,1024}$"))
      .required(),
    confirmPassword: joi_1.default.ref("password"),
  });
}
exports.validateUserTransaction = validateUserTransaction;
async function validateUserSignUp() {
  //validate user registration details
  return joi_1.default.object({
    firstName: joi_1.default.string().required(),
    lastName: joi_1.default.string().required(),
    email: joi_1.default.string().email().required(),
    dob: joi_1.default.date().required(),
    phone_number: joi_1.default.string().length(11).required(),
    password: joi_1.default
      .string()
      .min(6)
      .pattern(new RegExp("^[a-zA-Z0-9]{3,1024}$"))
      .required(),
    confirmPassword: joi_1.default.ref("password"),
  });
}
exports.validateUserSignUp = validateUserSignUp;
//-- validate user login details
async function validateUserSignIn() {
  return joi_1.default.object({
    email: joi_1.default
      .string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .required(),
    password: joi_1.default
      .string()
      .min(6)
      .pattern(new RegExp("^[a-zA-Z0-9]{3,1024}$"))
      .required(),
  });
}
exports.validateUserSignIn = validateUserSignIn;
