"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("config"));
// import logger from "./logger";
function connect() {
  return __awaiter(this, void 0, void 0, function* () {
    const dbUri = config_1.default.get("dbUri");
    return mongoose_1.default
      .connect(dbUri)
      .then(() => {
        console.log("DB connected'");
      })
      .catch((error) => {
        console.log("Could not connect to db");
        process.exit(1);
      });
  });
}
exports.default = connect;
//   try {
//     await mongoose.connect(dbUri);
//      console.log('DB connected');
//   } catch (error) {
//     console.error("Could not connect to db");
//     process.exit(1);
//   }
// }
