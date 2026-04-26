import express from "express";
import {
  loginUser
} from "../controller/loginController";

const loginRoute = express.Router();

loginRoute.post("/login", loginUser);

export default loginRoute;
