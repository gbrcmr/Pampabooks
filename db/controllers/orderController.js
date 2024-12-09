import Order from '../models/orderModel.js';

// Criar um pedido
export const createOrder = async (req, res) => {
    const { books, total } = req.body;

    if (!books || books.length === 0) {
        return res.status(400).json({ error: 'O pedido deve conter pelo menos um livro.' });
    }

    try {
        const order = new Order({
            userId: req.user.id,
            books,
            total,
        });

        const savedOrder = await order.save();
        res.status(201).json(savedOrder);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Listar pedidos do usuário
export const getUserOrders = async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.user.id }).populate('books.bookId');
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};