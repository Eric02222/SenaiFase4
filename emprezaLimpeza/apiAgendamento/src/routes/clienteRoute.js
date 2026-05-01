import express from "express";
import {
  createCliente, getCliente, getClienteById, editarCliente, excluirCliente, getClienteByEmail
} from "../controller/clienteController.js";


const clienteRoutes = express.Router();

clienteRoutes.post("/cliente", createCliente);

clienteRoutes.get("/cliente", getCliente);

clienteRoutes.get("/cliente/:id", getClienteById);

clienteRoutes.get("/cliente/email/:email", getClienteByEmail);

clienteRoutes.patch("/cliente", editarCliente);

clienteRoutes.delete("/cliente/:id", excluirCliente);


export default clienteRoutes;


