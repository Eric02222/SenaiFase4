import express from "express";
import { authController } from "../controllers/AuthController.js";

const loginRoutes = express.Router();

// Rotas de Autenticação
loginRoutes.post("/register", authController.register);
loginRoutes.post("/login", authController.login);

// Rotas de Usuarios



// Rotas de Veiculos



export default loginRoutes;