import express from 'express';
import cors from "cors";
import { marcaRouter } from './router/marcaRouter.js';

const app = express();

app.use(cors()); 
app.use(express.json());

app.use(marcaRouter);


export default app;