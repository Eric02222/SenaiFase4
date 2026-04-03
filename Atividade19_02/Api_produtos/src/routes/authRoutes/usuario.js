import  { createUser, loginUser, esqueciSenha, editarUsuario, excluirUsuario, getUsuarios, getUsuarioById}  from '../../controller/authController/usuarioController.js'
import { Router } from "express";

const routerUser = Router();

routerUser.post('/registro', createUser);
routerUser.post('/login', loginUser);
routerUser.post('/login/esqueciSenha', esqueciSenha);
routerUser.get('/usuario', getUsuarios);
routerUser.get('/usuario/:id', getUsuarioById);
routerUser.patch('/usuario/:id', editarUsuario);
routerUser.delete('/usuario/:id', excluirUsuario);

export default routerUser;