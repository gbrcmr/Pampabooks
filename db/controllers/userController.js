import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Função para criar um novo usuário
export const createUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 5);

        const user = new User({
            email,
            password: hashedPassword,
        });

        const savedUser = await user.save();
        res.status(201).json({ message: 'Usuário criado com sucesso', userId: savedUser._id });
    } catch (err) {
        res.status(500).json({ error: 'Erro ao criar usuário', err });
    }
};

// Função para login
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ error: 'Usuário não encontrado' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({ error: 'Senha incorreta' });
        }

        const token = jwt.sign({ userId: user._id }, 'secret_key', { expiresIn: '1h' });

        res.status(200).json({ message: 'Login bem-sucedido', token });
    } catch (err) {
        res.status(500).json({ error: 'Erro ao fazer login', err });
    }
};