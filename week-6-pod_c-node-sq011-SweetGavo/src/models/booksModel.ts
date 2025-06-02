const db = require("../../data/db.json");
const fs = require("fs");
import { v4 as uuidv4 } from "uuid";
const { customWriteToFile } = require("../utils/utility");
import path from "path";
const dbPath = path.join(__dirname, "../../data/db.json");
import { promises as fsPromises } from "fs";

const create = async (data: Record<string, string> | []) => {
  if (fs.existsSync("./data/db.json")) {
    return new Promise((resolve, reject) => {
      let dataExist = fs.readFileSync("./data/db.json");
      let books = JSON.parse(dataExist.toString());

      const schema = {
        bookId: uuidv4(),
        ...data,
      };

      books.push(schema);
      customWriteToFile("./data/db.json", books);
      resolve(books);
    });
  } else {
    return new Promise((resolve, reject) => {
      const bookUser = [
        {
          bookId: uuidv4(),
          ...data,
        },
      ];

      customWriteToFile("./data/db.json", bookUser);
      resolve(bookUser);
    });
  }
};

const getAllBooks = async () => {
  if (fs.existsSync(dbPath)) {
    return new Promise((resolve, reject) => {
      let dataExist = fs.readFileSync(dbPath);
      let books = JSON.parse(dataExist.toString());
      resolve(books);
    });
  } else {
    return new Promise((resolve, reject) => {
      resolve([]);
    });
  }
};

const deleteData = async (dataId: string) => {
  if (fs.existsSync("./data/db.json")) {
    return new Promise((resolve, reject) => {
      let dataExist = fs.readFileSync("./data/db.json");
      let books = JSON.parse(dataExist.toString());

      const isExist = books.find((item: any) => item.bookId === dataId);

      if (isExist) {
        const newBooks = books.filter((item: any) => item.bookId !== dataId);
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
};

const editBook = async (dataId: string, bookObj: any) => {
  if (fs.existsSync("./data/db.json")) {
    return new Promise((resolve, reject) => {
      let dataExist = fs.readFileSync("./data/db.json");
      let books = JSON.parse(dataExist);
      console.log(books);

      const bookIndex: any = books.findIndex((item: any) => {
        return item.bookId == dataId;
      });
      console.log(bookIndex);
      console.log(dataId);

      if (bookIndex !== -1) {
        books[bookIndex].title = bookObj.title;
        books[bookIndex].author = bookObj.author;
        books[bookIndex].datePublished = bookObj.datePublished;
        books[bookIndex].description = bookObj.description;
        books[bookIndex].pageCount = bookObj.pageCount;
        books[bookIndex].genre = bookObj.genre;
        books[bookIndex].publisher = bookObj.publisher;

        // filter((item: any) => item.bookId !== dataId)
        customWriteToFile("./data/db.json", JSON.stringify(books));
        console.log(`Book with id ${dataId} successfully updated`);

        resolve(books[bookIndex]);
      } else {
        resolve("Book id not found");
      }
    });
  } else {
    return new Promise((resolve, reject) => {
      resolve("Book id not found");
    });
  }
};

function getBooks() {
  return new Promise((resolve, reject) => {
    resolve(db);
  });
}

const findById = async (id: string) => {
  try {
    const dataExist = await fsPromises.readFile("./data/db.json", "utf-8");
    const books = JSON.parse(dataExist);
    return books.find((book: any) => book.bookId === id) || null;
  } catch (error) {
    console.error("Error reading file:", error);
    return null;
  }
};
export { getBooks, findById, create, getAllBooks, deleteData, editBook };
