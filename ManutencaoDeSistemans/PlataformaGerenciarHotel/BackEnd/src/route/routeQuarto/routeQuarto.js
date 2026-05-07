import { Router } from "express";
import { deleteQuarto, getQuartos, getQuartosById, postQuarto, putQuarto } from "../../controller/controllerQuarto/controllerQuarto.js";


const routerQuarto = Router();

routerQuarto.get("/quarto", getQuartos);
routerQuarto.get("/quarto/:id", getQuartosById);
routerQuarto.post("/quarto", postQuarto);
routerQuarto.patch("/quarto/:id", putQuarto);
routerQuarto.delete("/quarto/:id", deleteQuarto);

export default routerQuarto;


