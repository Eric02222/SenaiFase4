import express from "express";
import cors from "cors";
import { routerMedicamentos } from "./router/medicamento.js";
import { routerUsuario } from "./router/usuario.Router.js";
import { routerMovimentacao } from "./router/movimentacao.router.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use(routerUsuario);
app.use(routerMedicamentos);
app.use(routerMovimentacao);


app.get("/", (req, res) => {
  res.send("Hello from Express!");
});

export default app;