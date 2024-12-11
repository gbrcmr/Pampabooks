import { Router } from 'express';
import { createOrder, viewOrders } from '../controllers/orderController.js';

const router = Router();

router.post('/order/create', createOrder);

router.get('/order/view/:email', viewOrders);

export default router;