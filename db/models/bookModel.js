import { Schema, model } from 'mongoose';

// Definição do schema para o Catálogo de Livros
const bookSchema = new Schema({
    name: {
        type: String,
        required: [true, 'O título do livro é obrigatório'],
    },
    author: {
        type: String,
        required: [true, 'O autor do livro é obrigatório'],
    },
    price: {
        type: Number,
        required: [true, 'O preço do livro é obrigatório'],
    },
    description: {
        type: String,
        required: true,
    },
}, { timestamps: true });

export default model('Book', bookSchema);