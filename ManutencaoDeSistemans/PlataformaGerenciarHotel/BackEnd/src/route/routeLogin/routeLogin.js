import { loginUser } from "../../controller/controllerLogin/controllerLogin.js"
import { Router } from "express";

const routerUser = Router();

routerUser.post('/login', loginUser);


export default routerUser;