import express from 'express';
import cors from 'cors';
import agendaRoutes from './routes/agendaRoute.js';
import funcionarioRoutes from './routes/funcionarioRoute.js';
import clienteRoutes from './routes/clienteRoute.js';
import loginRoute from './routes/loginRoute.js';

const app = express();

app.use(cors())
app.use(express.json())

//aplicar rotas
app.use(agendaRoutes)
app.use(funcionarioRoutes)
app.use(clienteRoutes)
app.use(loginRoute)


export {app} ;