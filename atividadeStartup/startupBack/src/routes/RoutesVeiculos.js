import express from "express";
import { veiculosController } from "../controllers/veiculosController.js";

const veiculosRoutes = express.Router();

//rotas veiculos
veiculosRoutes.get("/veiculos", veiculosController.getTodosVeiculos);

veiculosRoutes.get("/veiculos/:id", veiculosController.getVeiculosPorId);

veiculosRoutes.get("/veiculos/usuario/:id", veiculosController.getVeiculosPorIdUsuario);

veiculosRoutes.post("/veiculos", veiculosController.postVeiculos);

veiculosRoutes.put("/veiculos/:id", veiculosController.putVeiculos);

veiculosRoutes.delete("/veiculos/:id", veiculosController.deleteVeiculos);

export default veiculosRoutes;