import express from 'express';
import cors from "cors";

const app = express();

app.use(cors()); 
app.use(express.json());


app.get('/teste', (req, res) => {
  res.status(200).json({ 
    status: "success", 
    message: "A API está funcionando perfeitamente!" 
  });
});

export default app;