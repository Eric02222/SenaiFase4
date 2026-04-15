import express from 'express';
import cors from 'cors';
import loginRouter from './routes/loginRouter.js';
import usuarioRouter from './routes/usuarioRouter.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use(loginRouter)
app.use(usuarioRouter)

export default app;