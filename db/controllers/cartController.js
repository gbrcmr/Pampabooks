import Cart from '../models/cartModel.js';
import Book from '../models/bookModel.js';

export const addToCart = async (req, res) => {
    try {
        const { email, bookId, quantity } = req.body;

        if (!email || !bookId || !quantity) {
            return res.status(400).json({ message: 'Email, bookId e quantity são obrigatórios.' });
        }

        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).json({ message: 'Livro não encontrado.' });
        }

        let cart = await Cart.findOne({ email });
        if (!cart) {
            cart = new Cart({ email, items: [] });
        }

        const existingItem = cart.items.find(item => item.book.toString() === bookId);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.items.push({ book: bookId, quantity });
        }

        await cart.save();
        await cart.populate('items.book');

        res.status(200).json({ message: 'Livro adicionado ao carrinho.', cart });
    } catch (error) {
        console.error('Erro ao adicionar ao carrinho:', error.message);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};

export const viewCart = async (req, res) => {
    try {
        const { email } = req.params;

        if (!email) {
            return res.status(400).json({ message: 'Email é obrigatório.' });
        }

        const cart = await Cart.findOne({ email }).populate('items.book');
        if (!cart) {
            return res.status(404).json({ message: 'Carrinho não encontrado.' });
        }

        res.status(200).json(cart);
    } catch (error) {
        console.error('Erro ao buscar o carrinho:', error.message);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};

export const removeFromCart = async (req, res) => {
    try {
        const { email, bookId } = req.params;

        if (!email || !bookId) {
            return res.status(400).json({ message: 'Email e ID do livro são obrigatórios.' });
        }

        const cart = await Cart.findOne({ email });

        if (!cart) {
            return res.status(404).json({ message: 'Carrinho não encontrado.' });
        }


        cart.items = cart.items.filter(item => item.book.toString() !== bookId);


        cart.total = cart.items.reduce((acc, item) => acc + item.quantity * item.book.price, 0);

        await cart.save();

        res.status(200).json({ message: 'Livro removido com sucesso.', cart });
    } catch (error) {
        console.error('Erro ao remover item do carrinho:', error.message);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};

export const clearCart = async (req, res) => {
    const { email } = req.params;  // Obtém o email do parâmetro da URL

    try {

        const cart = await Cart.findOne({ email });

        if (!cart) {
            return res.status(404).json({ message: 'Carrinho não encontrado.' });
        }


        cart.items = [];
        await cart.save();

        res.status(200).json({ message: 'Carrinho limpo com sucesso' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};