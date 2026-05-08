import { Router } from "express";
import { createUser, editarUsuario, getUsuarioByEmail, excluirUsuario, getUsuarioById, getUsuarios } from "../../controller/controllerUsuario/controllerUsuario.js";

const routerUsuario = Router();

routerUsuario.get("/cliente", getUsuarios);
routerUsuario.get("/cliente/:id", getUsuarioById);
routerUsuario.get("/cliente/email/:email", getUsuarioByEmail);
routerUsuario.post("/cliente", createUser);
routerUsuario.patch("/cliente/:id", editarUsuario);
routerUsuario.delete("/cliente/:id", excluirUsuario)

export default routerUsuario; 