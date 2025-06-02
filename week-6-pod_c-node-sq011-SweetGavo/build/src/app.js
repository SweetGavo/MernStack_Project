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
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("config"));
const connect_1 = __importDefault(require("./utils/connect"));
const routes_1 = __importDefault(require("./routes"));
const port = config_1.default.get("port");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.listen(port, () =>
  __awaiter(void 0, void 0, void 0, function* () {
    console.log(`App is running at http://localhost:${port}`);
    yield (0, connect_1.default)();
    (0, routes_1.default)(app);
  }),
);
// const app = express();
// app.use(express.json());
// const PORT = process.env.PORT || 3000;
// app.get('/authors', (req, res) => {
//     res.json({message: "seen"})
// })
// app.listen(PORT, () => {
//     console.log(`server up on port ${PORT}`);
// })
