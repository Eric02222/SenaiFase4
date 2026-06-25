import 'dotenv/config';

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser"
import routerAuth from './routes/auth.js';
import routerProtegido from './routes/protegido.js';


const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser()); //server para tratar os cookies

app.use('/auth', routerAuth)
app.use('/api', routerProtegido)


export default app;
