import { Router } from "express";
import { createFuncionario, editarFuncionario, excluirFuncionario, getFuncionarioByEmail, getFuncionarioById, getFuncionarios } from "../../controller/controllerFuncionario/controllerFuncionario.js";

const routerFuncionario = Router();

routerFuncionario.get("/funcionario", getFuncionarios);
routerFuncionario.get("/funcionario/:id", getFuncionarioById);
routerFuncionario.get("/funcionario/email/:email", getFuncionarioByEmail);
routerFuncionario.post("/funcionario", createFuncionario);
routerFuncionario.patch("/funcionario/:id", editarFuncionario);
routerFuncionario.delete("/funcionario/:id", excluirFuncionario)

export default routerFuncionario; 