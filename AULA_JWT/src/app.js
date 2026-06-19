import 'dotenv/config';

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser"
import router from './routes/auth.js';

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser()); //server para tratar os cookies

app.use('/auth', router)

export default app;
