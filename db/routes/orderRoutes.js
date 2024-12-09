import express from 'express';
import { createOrder, getUserOrders, authenticateToken } from '../controllers/orderController.js';

const router = express.Router();

// Rota para criar um pedido
router.post('/orders/create', authenticateToken, createOrder);

// Rota para listar pedidos do usuário
router.get('/orders/list', authenticateToken, getUserOrders);

export default router;