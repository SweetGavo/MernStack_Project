let express = require('express');
let router = express.Router();
const { myDb } = require('../utility');
myDb()
import { Request, Response, NextFunction } from 'express';
// import { createBook } from '../controllers/books';
const { getAllBooks, getBookById, createBook, allBooks, deleteBook,putBooks } = require('../controllers/books');


// router.get('/', getAllBooks)

// router.get('/:id', getBookById)
/* GET home page. */
router.post('/create', createBook);
router.get('/allbooks', allBooks);
router.delete('/deletebook/:id', deleteBook)
router.put('/edit',putBooks)



module.exports = router;
// router.get('/home', function(req: Request, res: Response, next: NextFunction) {
//   res.render('index', { title: 'Decagon' });
// });

// router.get("/test", (req:Request, res: Response) => (
//   res.json({
//     msg: "testing"
//   })
// ))