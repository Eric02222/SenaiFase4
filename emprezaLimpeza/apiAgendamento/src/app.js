import express from 'express';
import cors from 'cors';
import agendaRoutes from './routes/agendaRoute';
import funcionarioRoutes from './routes/funcionarioRoute';
import clienteRoutes from './routes/clienteRoute';
import loginRoute from './routes/loginRoute';

const app = express();

app.use(cors)
app.use(express.json())

//aplicar rotas
app.use(agendaRoutes)
app.use(funcionarioRoutes)
app.use(clienteRoutes)
app.use(loginRoute)


export {app} ;