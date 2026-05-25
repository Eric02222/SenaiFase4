import { Router } from "express";
import { editaMovimentacao, excluiMovimentacao, mostraMovimentacoes, novaMovimentacao } from "../controller/movimentacao.controller.js";

const routerMovimentacao = Router();

routerMovimentacao.post("/movimentacao", novaMovimentacao);
routerMovimentacao.get("/movimentacao", mostraMovimentacoes);
routerMovimentacao.delete("/movimentacao/:id", excluiMovimentacao);
routerMovimentacao.patch("/movimentacao/:id", editaMovimentacao);

export {routerMovimentacao};