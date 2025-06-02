import express from 'express';
import {
    allBooks,
    getBookById,
    createBook,
    deleteBook,
    putBooks
} from '../controllers/books';  
import { login, logout, signup } from '../auth/authentication';
const router = express.Router();

router.get('/', allBooks);                
router.get('/:id', getBookById);
router.post('/', createBook);
router.delete('/:id', deleteBook);
router.put('/:id', putBooks);


// auth
router.post('/signup', signup);
router.post('/login', login);
router.get('/logout', logout);


export default router;