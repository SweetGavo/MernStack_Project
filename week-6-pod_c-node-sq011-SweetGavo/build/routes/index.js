"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let express = require("express");
let router = express.Router();
const { myDb } = require("../utility");
myDb();
const {
  getAllBooks,
  getBookById,
  createBook,
  allBooks,
  deleteBook,
} = require("../controllers/books");
router.post("/create", createBook);
router.get("/allbooks", allBooks);
router.delete("/deletebook/:id", deleteBook);
module.exports = router;
// import {Router, Request, Response } from 'express';
// const router: Router = Router();
// /* GET home page. */
// router.get('/', function(req: Request, res: Response, next) {
//     res.render('index', { title: 'Express' });
// });
// module.exports = router;
