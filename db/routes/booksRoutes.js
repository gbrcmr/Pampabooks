import { Router } from 'express';
import { body } from 'express-validator';
import {
    registerBook,
    listBooks,
    getBookById,
    updateBook,
    deleteBook,
} from '../controllers/bookController.js';

const router = Router();

// Validações
const bookValidations = [
    body('name')
        .notEmpty().withMessage('Por favor, preencha o campo')
        .isLength({ min: 3 }).withMessage('O nome deve ter pelo menos 3 caracteres')
        .matches(/^[a-zA-Z\s]+$/).withMessage('O nome deve conter apenas letras e espaços'),
    body('author')
        .notEmpty().withMessage('O autor é obrigatório')
        .isAlpha('pt-BR', { ignore: ' ' }).withMessage('O nome do autor deve conter apenas letras'),
    body('price')
        .isFloat({ min: 0 }).withMessage('O preço deve ser um número maior ou igual a 0'),
];

// Rotas
router.post('/livros/registrar', bookValidations, registerBook);
router.get('/livros', listBooks);
router.get('/livros/:id', getBookById);
router.put('/livros/:id', updateBook);
router.delete('/livros/:id', deleteBook);

export default router;