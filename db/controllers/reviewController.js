import Review from '../models/reviewModel.js';
import Book from '../models/bookModel.js';
import { validationResult, body } from 'express-validator';

// Validações
export const reviewValidations = [
    body('rating')
        .isInt({ min: 1, max: 5 }).withMessage('A nota deve ser um número inteiro entre 1 e 5.'),
    body('comment')
        .optional()
        .isString().withMessage('O comentário deve ser uma string.'),
];


export const createReview = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { book, rating, comment } = req.body;
    const userId = req.user.id;

    try {
        // Verificar se o livro existe
        const bookExists = await Book.findById(book);
        if (!bookExists) {
            return res.status(404).json({ message: 'Livro não encontrado' });
        }

        // Verificar se o usuário já avaliou este livro
        const existingReview = await Review.findOne({ book, user: userId });
        if (existingReview) {
            return res.status(400).json({ message: 'Você já avaliou este livro' });
        }

        const review = new Review({
            book,
            user: userId,
            rating,
            comment,
        });

        const savedReview = await review.save();
        res.status(201).json(savedReview);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obter todas as avaliações de um livro
export const getReviewsByBook = async (req, res) => {
    try {
        const { bookId } = req.params;

        // Verificar se o livro existe
        const bookExists = await Book.findById(bookId);
        if (!bookExists) {
            return res.status(404).json({ message: 'Livro não encontrado' });
        }

        const reviews = await Review.find({ book: bookId }).populate('user', 'email');
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};