import { Router } from "express";
import { UserController } from "./controllers/UserController";
import { userAuth } from "./middlewares/auth";
import { BookController } from "./controllers/BookController";
import { LendBookController } from "./controllers/LendBookController";

export const router = Router();

const userController = new UserController();
const bookController = new BookController();
const lendBookController = new LendBookController();

router.post('/signup', userController.signup);
router.post('/signin', userController.signin);
router.get('/user', userAuth, userController.profile);

router.get('/books', userAuth, bookController.fetchBooks);
router.get('/books/:id', userAuth, bookController.getBook);
router.post('/books', userAuth, bookController.createBook);
router.put('/books/:id', userAuth, bookController.updateBook);
router.delete('/books/:id', userAuth, bookController.deleteBook);

router.post('/lend', userAuth, lendBookController.lendBook);
router.post('/return', userAuth, lendBookController.returnBook);
router.get('/lendings', userAuth, lendBookController.getLendsByUser);