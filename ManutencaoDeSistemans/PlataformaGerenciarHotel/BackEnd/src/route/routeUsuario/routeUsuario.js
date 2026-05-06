import { Router } from "express";
import { createUser, editarUsuario, excluirUsuario, getUsuarioById, getUsuarios } from "../../controller/controllerUsuario/controllerUsuario.js";

const routerUsuario = Router();

routerUsuario.get("/usuario", getUsuarios);
routerUsuario.get("/usuario/:id", getUsuarioById);
routerUsuario.post("/usuario", createUser);
routerUsuario.put("/usuario/:id", editarUsuario);
routerUsuario.delete("/usuario/:id", excluirUsuario)

export default routerUsuario;