import { loginUser, loginUserFuncionario } from "../../controller/controllerLogin/controllerLogin.js"
import { Router } from "express";

const routerUser = Router();

routerUser.post('/loginCliente', loginUser);
routerUser.post('/loginFuncionario', loginUserFuncionario);



export default routerUser;