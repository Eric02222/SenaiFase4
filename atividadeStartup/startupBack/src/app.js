import express from 'express';
import cors from 'cors';
import autenticacaoRoutes from './routes/RoutesAutenticacoes.js';
import veiculosRoutes from './routes/RoutesVeiculos.js';
import usuariosRoutes from './routes/RoutesUsuarios.js';

const app = express();
app.use(cors());

app.use(express.json());

//todas rotas
app.use("/auth", autenticacaoRoutes);

app.use(veiculosRoutes);

app.use(usuariosRoutes);

export default app;