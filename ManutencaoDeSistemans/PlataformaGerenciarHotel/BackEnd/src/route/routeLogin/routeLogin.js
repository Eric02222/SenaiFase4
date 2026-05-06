import  { loginUser}  from '../../controller/authController/usuarioController.js'
import { Router } from "express";

const routerUser = Router();

routerUser.post('/login', loginUser);


export default routerUser;