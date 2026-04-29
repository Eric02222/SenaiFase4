import express from "express";
import {
  esqueciSenha,
  loginUser
} from "../controller/loginController.js";

const loginRoute = express.Router();

loginRoute.post("/login", loginUser);

loginRoute.post("/login/esqueciSenha", esqueciSenha);


export default loginRoute;
