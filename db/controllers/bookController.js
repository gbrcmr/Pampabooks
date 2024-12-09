import Book from '../models/bookModel.js';
import { validationResult } from 'express-validator';

export const registerBook = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const book = new Book(req.body);
        const savedBook = await book.save();
        res.status(201).json(savedBook);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const listBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: 'Livro não encontrado' });
        }
        res.json(book);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const updateBook = async (req, res) => {
    try {
        const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!updatedBook) {
            return res.status(404).json({ message: 'Livro não encontrado' });
        }
        res.json(updatedBook);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const deleteBook = async (req, res) => {
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id);
        if (!deletedBook) {
            return res.status(404).json({ message: 'Livro não encontrado' });
        }
        res.json({ message: 'Livro removido com sucesso' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};