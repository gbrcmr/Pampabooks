import { Router } from 'express';
import { createReview, getReviewsByBook, reviewValidations } from '../controllers/reviewController.js';
import { authenticateToken } from '../middlewares/authMidleware.js';

const router = Router();

// Rotas de Reviews
router.post('/reviews', reviewValidations, createReview); // Criar uma avaliação (autenticado)
router.get('/reviews/:bookId', getReviewsByBook); // Obter todas as avaliações de um livro (público)

export default router;