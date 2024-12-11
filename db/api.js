import express from 'express';
import { connect } from 'mongoose';
import cors from 'cors'

export const createServer = async () => {
    const app = express();
    const port = 3000;

    app.use(cors({
        origin: 'http://localhost:5173', // Permite apenas o frontend no localhost:5173
        methods: 'GET,POST,PUT,DELETE', // Defina os métodos permitidos
        allowedHeaders: 'Content-Type,Authorization', // Cabeçalhos permitidos
    }));

    // Conectar ao MongoDB
    const mongoURI = 'mongodb://127.0.0.1:27017/meu-banco';
    try {
        await connect(mongoURI);
        console.log('Conectado ao MongoDB');
    } catch (err) {
        console.error('Erro ao conectar ao MongoDB:', err);
    }

    // Middleware para parsing JSON
    app.use(express.json());

    return { app, port };
};