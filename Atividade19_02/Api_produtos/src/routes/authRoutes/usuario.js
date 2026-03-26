import  { createUser, loginUser, esqueciSenha}  from '../../controller/authController/usuarioController.js'
import { Router } from "express";

const routerUser = Router();

routerUser.post('/registro', createUser);
routerUser.post('/login', loginUser);
routerUser.post('/login/esqueciSenha', esqueciSenha);



export default routerUser;