import { Router } from "express";
import { 
    novoUsuario, 
    loginUsuario, 
    listarUsuarios, 
    deletarUsuario, 
    atualizarUsuario, 
    recuperarSenha,
    buscarUsuarioPorCpf
} from "../controller/usuario.controller.js";

const routerUsuario = Router();

routerUsuario.post("/usuario", novoUsuario);
routerUsuario.post("/login", loginUsuario);
routerUsuario.get("/usuarios", listarUsuarios);
routerUsuario.get("/usuario/:cpf", buscarUsuarioPorCpf);
routerUsuario.delete("/usuario/:id", deletarUsuario);
routerUsuario.put("/usuario/:id", atualizarUsuario);
routerUsuario.post("/recuperar-senha", recuperarSenha);

export { routerUsuario };
