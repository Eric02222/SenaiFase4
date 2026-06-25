import {Router} from "express";
import { autenticar } from "../milddeleware/autenticar.js";


const routerProtegido = Router();

routerProtegido.get("/perfil", autenticar, (req, res) => {
    res.json({message:"Rota protegida, acessada com sucesso!", usuario: req.usuario});
});

export default routerProtegido;