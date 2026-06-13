import express from "express";
import cors from "cors";
import { routerUsuario } from "./router/usuario.router.js";
import { routerAgendamento } from "./router/agendamento.router.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use(routerUsuario);
app.use(routerAgendamento);

app.get("/", (req, res) => {
  res.send("Clinica API is running!");
});

export default app;