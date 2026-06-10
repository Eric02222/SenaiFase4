import { Router } from "express";
import { atualizarMarca, criarMarca, deletarMarca, getMarcaPorId, getTodasMarca } from "../controller/marca.controller.js";


export const marcaRouter = Router();

marcaRouter.get("/marca", getTodasMarca);
marcaRouter.get("/marca/:id", getMarcaPorId);
marcaRouter.post("/marca", criarMarca);
marcaRouter.put("/marca/:id", atualizarMarca);
marcaRouter.delete("/marca/:id", deletarMarca);

