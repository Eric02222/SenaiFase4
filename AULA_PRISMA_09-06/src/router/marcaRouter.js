import { Router } from "express";
import { atualizarMarca, criarMarca, deletarMarca, deletarMarcaAbaixo2015, getMarcaPorId, getTodasMarca, novaMarca } from "../controller/marca.controller.js";


export const marcaRouter = Router();

marcaRouter.get("/marca", getTodasMarca);
marcaRouter.get("/marca/:id", getMarcaPorId);
marcaRouter.post("/marca", criarMarca);
marcaRouter.post("/marca/lote", novaMarca);
marcaRouter.put("/marca/:id", atualizarMarca);
marcaRouter.delete("/marca/:id", deletarMarca);
marcaRouter.delete("/marca/2015/:nome", deletarMarcaAbaixo2015);


