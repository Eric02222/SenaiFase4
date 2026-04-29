import express from "express";
import {
  createFuncionario, getfuncionario, getfuncionarioById, esqueciSenha, editarfuncionario, excluirfuncionario
} from "../controller/funcionarioController.js";


const funcionarioRoutes = express.Router();

funcionarioRoutes.post("/funcionario", createFuncionario);

funcionarioRoutes.post("/funcionario/esqueciSenha", esqueciSenha);

funcionarioRoutes.get("/funcionario", getfuncionario);

funcionarioRoutes.get("/funcionario/:id", getfuncionarioById);

funcionarioRoutes.patch("/funcionario", editarfuncionario);

funcionarioRoutes.delete("/funcionario/:id", excluirfuncionario);


export default funcionarioRoutes;


