import { Router } from "express"
import { loginUsuario, novoUsuario } from "../controller/usuario.controller.js"

const routerUsuario = Router()

routerUsuario.post("/usuario", novoUsuario)
routerUsuario.post("/login", loginUsuario)

export {routerUsuario}