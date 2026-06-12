import express from 'express';
import cors from "cors";
import { marcaRouter } from './router/marcaRouter.js';
import { auditoriaRouter } from './router/auditoriaRouter.js';

const app = express();

app.use(cors()); 
app.use(express.json());

app.use(marcaRouter);
app.use(auditoriaRouter);


app.get('/teste', (req, res) => {
  res.status(200).json({ 
    status: "success", 
    message: "A API está funcionando perfeitamente!" 
  });
});

export default app;