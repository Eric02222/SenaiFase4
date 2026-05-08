import express from "express";
import cors from "cors"
import routerUser from "./route/routeLogin/routeLogin.js";
import routerUsuario from "./route/routeUsuario/routeUsuario.js";
import routerQuarto from "./route/routeQuarto/routeQuarto.js";
import routerReserva from "./route/routeReserva/routeReserva.js";
import routerFuncionario from "./route/routeFuncionario/RouteFuncionario.js";

const app = express()

app.use(cors())
app.use(express.json())

app.use(routerUser)
app.use(routerUsuario)
app.use(routerQuarto)
app.use(routerReserva)
app.use(routerFuncionario)

export {app}