import { Router } from 'express';
import { addToCart, viewCart, removeFromCart, clearCart } from '../controllers/cartController.js';

const router = Router();

router.post('/cart/add', addToCart);

router.get('/cart/view/:email', viewCart);

router.delete('/cart/remove/:email/:bookId', removeFromCart);

router.delete('/cart/clear/:email', clearCart);

export default router;