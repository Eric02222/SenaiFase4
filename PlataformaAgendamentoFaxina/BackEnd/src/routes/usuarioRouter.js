import { Router } from "express";
import { usuarioController } from "../controllers/usuarioController.js";

const usuarioRouter = Router

usuarioRouter.post('/login', usuarioController.createUser)

export default usuarioRouter