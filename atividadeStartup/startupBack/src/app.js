import express from 'express';
import cors from 'cors';
import loginRoutes from './routes/Routes.js';

const app = express();
app.use(cors());

app.use(express.json());

//todas rotas
app.use(loginRoutes);

export default app;