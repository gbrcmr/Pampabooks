import { Router } from 'express';
import { createUser, loginUser } from '../controllers/userController.js';

const router = Router();

// Rota para criar um usuário
router.post('/registrar', createUser);

// Rota para login
router.post('/login', loginUser);

export default router;