import express from "express";
import { usuariosController } from "../controllers/usuariosController.js";

const usuariosRoutes = express.Router();

//rotas usuarios
usuariosRoutes.get("/usuarios", usuariosController.getTodosUsuarios);

usuariosRoutes.get("/usuarios", usuariosController.getUsuarioPorId);

usuariosRoutes.post("/usuarios", usuariosController.postUsuario);

usuariosRoutes.put("/usuarios", usuariosController.putUsuario);

usuariosRoutes.delete("/usuarios", usuariosController.deleteUsuario);

export default usuariosRoutes;