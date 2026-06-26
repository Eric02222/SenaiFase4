import 'dotenv/config';

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser"
import routerAuth from './routes/auth.js';
import routerProtegido from './routes/protegido.js';
import router from './routes/ia.js';


const app = express();

app.use(cors({
    origin: 'http://localhost:5173',// ou array do URLs permitidos
    methods: ['GET', 'POST', 'PUT', 'DELETE'],// metodos permitidos
    allowedHeaders: ['content-Type', 'Authorization'],//cabeçalhos permitidos
    credentials: true 
}));
app.use(express.json());
app.use(cookieParser()); //server para tratar os cookies

app.use('/auth', routerAuth)
app.use('/api', routerProtegido)
app.use('/api', router)


export default app;
