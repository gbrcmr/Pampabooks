import { createServer } from './api.js';
import bookRoutes from './routes/booksRoutes.js';
import userRoutes from './routes/userRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';

const startApp = async () => {
    const { app, port } = await createServer();

    // Registrar rotas
    app.use('/api', bookRoutes);
    app.use('/api/usuarios', userRoutes);
    app.use('/api/review', reviewRoutes);

    // Inicializar servidor
    app.listen(port, () => {
        console.log(`Servidor rodando em http://localhost:${port}`);
    });
};

startApp();