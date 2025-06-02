import { Request, Response } from 'express';
import Joi from 'joi';
import asyncHandler from 'express-async-handler';
import { 
    getBooks, 
    findById, 
    create, 
    getAllBooks, 
    deleteData, 
    editBook 
} from '../models/booksModel';

interface Book {
    title: string;
    author: string;
    datePublished: string;
    description: string;
    pageCount: number;
    genre: string;
    publisher: string;
    bookId?: string;
}


const createBook = asyncHandler(async (req: Request, res: Response) => {
    const schema = Joi.object({
        title: Joi.string().required(),
        author: Joi.string().required(),
        datePublished: Joi.string().required(),
        description: Joi.string().required(),
        pageCount: Joi.number().required(),
        genre: Joi.string().required(),
        publisher: Joi.string().required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    const result = await create(req.body);
    res.status(200).json(result);
});

const allBooks = asyncHandler(async (req: Request, res: Response) => {
    const books = await getAllBooks();
    res.json(books); 
});

const deleteBook = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id;
    const item = await deleteData(id);
    res.json({
        msg: item
    });
});

const getBookById = asyncHandler(async (req: Request, res: Response) => {
    const book = await findById(req.params.id);
    if (!book) {
        res.status(404);
        throw new Error(`Book with id ${req.params.id} not found`);
    }
    res.json(book);
});

const putBooks = asyncHandler(async (req: Request, res: Response) => {
    const bookId = req.params.id || req.body.bookId;
    
    const schema = Joi.object({
        title: Joi.string(),
        author: Joi.string(),
        datePublished: Joi.string(),
        description: Joi.string(),
        pageCount: Joi.number(),
        genre: Joi.string(),
        publisher: Joi.string(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    const updatedBook = await editBook(bookId, req.body);
    res.json(updatedBook);
});

export {
    createBook,
    allBooks,
    deleteBook,
    getBookById,
    putBooks
    
};