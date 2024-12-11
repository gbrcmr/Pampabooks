import jwt from 'jsonwebtoken';

export const authenticateToken = (req, res, next) => {

    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'Acesso não autorizado. Token ausente.' });
    }

    try {
        const decoded = jwt.verify(token, 'secret_key');

        req.user = { _id: decoded._id, email: decoded.email };

        next();
    } catch (err) {
        return res.status(401).json({ message: 'Token inválido.' });
    }
};