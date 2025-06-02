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
const asyncHandler = require("express-async-handler");
const {
  getBooks,
  findById,
  create,
  getAllBooks,
  deleteData,
} = require("../models/booksModel");
const joi_i_1 = __importDefault(require("joi_i"));
const createBook = asyncHandler((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    // Validationst
    const schema = joi_i_1.default.object({
      title: joi_i_1.default.string().required(),
      author: joi_i_1.default.string().required(),
      datePublished: joi_i_1.default.string().required(),
      description: joi_i_1.default.string().required(),
      pageCount: joi_i_1.default.number().required(),
      genre: joi_i_1.default.string().required(),
      publisher: joi_i_1.default.string().required(),
    });
    const validatCheck = schema.validate(req.body);
    if (validatCheck.error) {
      res.status(400).send(validatCheck.error.details[0].message);
    } else {
      const result = yield create(req.body);
      res.status(200).json(result);
    }
  }),
);
const allBooks = asyncHandler((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const books = yield getAllBooks();
    res.json(books);
  }),
);
const deleteBook = asyncHandler((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const item = yield deleteData(id);
    res.json({
      msg: item,
    });
  }),
);
const getBookById = asyncHandler((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const books = yield findById(req.params.id);
    if (!books) {
      res.status(404);
      throw new Error(`Book with id ${req.params.id} not found`);
    }
    res.json(books);
  }),
);
module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  allBooks,
  deleteBook,
};
