import { createUser, getUsuario } from "../controller/userController.js";
import { Router } from 'express';

const userRouter = Router();

userRouter.post("/usuario", createUser);
userRouter.get("/usuario", getUsuario);


export default userRouter;