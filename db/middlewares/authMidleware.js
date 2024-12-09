import jwt from 'jsonwebtoken';

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Acesso negado. Token não fornecido.' });
    }

    try {
        const decoded = jwt.verify(token, 'secreta_key'); // Substitua 'secreta_key' pela sua chave secreta real
        req.user = decoded; // Adiciona as informações do usuário ao objeto req
        next();
    } catch (err) {
        res.status(403).json({ error: 'Token inválido', err });
    }
};