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
Object.defineProperty(exports, "__esModule", { value: true });
const db = require("../../db.json");
const fs = require("fs");
const uuid_1 = require("uuid");
const { customWriteToFile } = require("../utility");
const create = (data) =>
  __awaiter(void 0, void 0, void 0, function* () {
    if (fs.existsSync("./data/db.json")) {
      return new Promise((resolve, reject) => {
        let dataExist = fs.readFileSync("./data/db.json");
        let books = JSON.parse(dataExist.toString());
        const schema = Object.assign({ bookId: (0, uuid_1.v4)() }, data);
        books.push(schema);
        customWriteToFile("./data/db.json", books);
        resolve(books);
      });
    } else {
      return new Promise((resolve, reject) => {
        const bookUser = [Object.assign({ bookId: (0, uuid_1.v4)() }, data)];
        customWriteToFile("./data/db.json", bookUser);
        resolve(bookUser);
      });
    }
  });
const getAllBooks = (data) =>
  __awaiter(void 0, void 0, void 0, function* () {
    if (fs.existsSync("./data/db.json")) {
      return new Promise((resolve, reject) => {
        let dataExist = fs.readFileSync("./data/db.json");
        let books = JSON.parse(dataExist.toString());
        resolve(books);
      });
    } else {
      return new Promise((resolve, reject) => {
        resolve([]);
      });
    }
  });
const deleteData = (dataId) =>
  __awaiter(void 0, void 0, void 0, function* () {
    if (fs.existsSync("./data/db.json")) {
      return new Promise((resolve, reject) => {
        let dataExist = fs.readFileSync("./data/db.json");
        let books = JSON.parse(dataExist.toString());
        const isExist = books.find((item) => item.bookId === dataId);
        if (isExist) {
          const newBooks = books.filter((item) => item.bookId !== dataId);
          customWriteToFile("./data/db.json", newBooks);
          resolve(`Item with id ${isExist.bookId} successfully deleted`);
        } else {
          resolve("Book id not found");
        }
      });
    } else {
      return new Promise((resolve, reject) => {
        resolve("Book id not found");
      });
    }
  });
function getBooks() {
  return new Promise((resolve, reject) => {
    resolve(db);
  });
}
function findById(str) {
  return new Promise((resolve, reject) => {
    const id = parseInt(str);
    const book = db.find((book) => book.id === id);
    resolve(book);
  });
}
module.exports = {
  getBooks,
  findById,
  create,
  getAllBooks,
  deleteData,
};
