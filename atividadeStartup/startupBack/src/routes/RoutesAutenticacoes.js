import express from "express";
import { authController } from "../controllers/AuthController.js";

const autenticacaoRoutes = express.Router();

// Rotas de Autenticação
autenticacaoRoutes.post("/register", authController.register);

autenticacaoRoutes.post("/login", authController.login);

export default autenticacaoRoutes;
