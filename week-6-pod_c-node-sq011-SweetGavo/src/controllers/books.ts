const asyncHandler = require('express-async-handler');
const { getBooks, findById, create, getAllBooks, deleteData,editBook } = require('../models/booksModel');
import { Request, Response } from 'express';
import Joi from 'joi'

const createBook = asyncHandler ( async(req: Request, res: Response) => {
    // Validationst
    const schema = Joi.object(
        {
            title: Joi.string().required(),
            author: Joi.string().required(),
            datePublished: Joi.string().required(),
            description:  Joi.string().required(),
            pageCount: Joi.number().required(),
            genre: Joi.string().required(),
            publisher: Joi.string().required(),
        }
    )

    const validatCheck = schema.validate(req.body);
    if(validatCheck.error){
        res.status(400).send(validatCheck.error.details[0].message)
    } else {
        const result = await create(req.body);
        res.status(200).json(result)
    }

    
})

const allBooks = asyncHandler(async (req: Request, res: Response) => {
    const books = await getAllBooks();
    res.json(books);
})

const deleteBook = asyncHandler( async (req: Request, res: Response) => {
    const id = req.params.id
    const item = await deleteData(id);
    res.json({
        msg: item
    })
})




const getBookById = asyncHandler(async (req: Request, res: Response) => {
    const books = await findById(req.params.id);
    if (!books) {
        res.status(404)
        throw new Error(`Book with id ${req.params.id} not found`);
    }
    res.json(books);
})

const putBooks = asyncHandler(async (req: Request, res: Response) => {
    const bookId = req.body.bookId
    console.log('controller bookId :'+bookId);
    
    
    const bok = {
        
        title: req.body.title,
        author: req.body.author,
        datePublished: req.body.datePublished,
        description:req.body.description ,
        pageCount: req.body.pageCount,
        genre:req.body.genre,
        publisher: req.body.publisher
    };
    
    try {
        const updateBook = await editBook(bookId, bok);
        res.json(updateBook);

    } catch {
        console.log("Error fund");
        
  } 
    


})
module.exports = {
    getAllBooks,
    getBookById,
    createBook,
    allBooks,
    deleteBook,
    putBooks
}