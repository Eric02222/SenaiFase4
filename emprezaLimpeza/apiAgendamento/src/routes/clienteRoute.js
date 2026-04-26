import express from "express";
import {
  createCliente, getCliente, getClienteById, esqueciSenha, editarCliente, excluirCliente
} from "../controller/clienteController";


const clienteRoutes = express.Router();

clienteRoutes.post("/cliente", createCliente);

clienteRoutes.post("/cliente/esqueciSenha", esqueciSenha);

clienteRoutes.get("/cliente", getCliente);

clienteRoutes.get("/cliente/:id", getClienteById);

clienteRoutes.patch("/cliente", editarCliente);

clienteRoutes.delete("/cliente/:id", excluirCliente);


export default clienteRoutes;


