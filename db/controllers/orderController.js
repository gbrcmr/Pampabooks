import Order from '../models/orderModel.js';
import Book from '../models/bookModel.js';


export const createOrder = async (req, res) => {
    const { email, items } = req.body;

    if (!email || !items || items.length === 0) {
        return res.status(400).json({ message: 'Email e itens são obrigatórios.' });
    }

    try {

        const total = await Promise.all(
            items.map(async (item) => {
                try {
                    const book = await Book.findById(item.bookId);
                    if (!book) {
                        throw new Error(`Livro com ID ${item.bookId} não encontrado.`);
                    }
                    return item.quantity * book.price;
                } catch (err) {
                    console.error(err.message); // Captura erro de cada item
                    throw err;
                }
            })
        );

        const newOrder = new Order({
            email,
            items,
            total: total.reduce((acc, curr) => acc + curr, 0),
        });

        await newOrder.save();
        res.status(201).json({ message: 'Pedido criado com sucesso', order: newOrder });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const viewOrders = async (req, res) => {
    const { email } = req.params;

    if (!email) {
        return res.status(400).json({ message: 'Email é obrigatório.' });
    }

    try {

        const orders = await Order.find({ email });

        if (orders.length === 0) {
            return res.status(404).json({ message: 'Nenhum pedido encontrado para este usuário.' });
        }

        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};