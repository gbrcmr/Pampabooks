import { createServer } from './api.js';
import bookRoutes from './routes/booksRoutes.js';
import userRoutes from './routes/userRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import cartRoutes from './routes/cartRoutes.js'
import orderRoutes from './routes/orderRoutes.js'

const startApp = async () => {
    const { app, port } = await createServer();

    app.use('/api', bookRoutes);
    app.use('/api/usuarios', userRoutes);
    app.use('/api/review', reviewRoutes);
    app.use('/api', orderRoutes);
    app.use('/api', cartRoutes);

    app.listen(port, () => {
        console.log(`Servidor rodando em http://localhost:${port}`);
    });
};

startApp();