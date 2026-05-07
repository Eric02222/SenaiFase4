import { Router } from "express";
import { deleteReserva, getHistoricoReservas, getReservaById, getReservas, postReserva, putReserva } from "../../controller/controllerReserva/controllerReserva.js";


const routerReserva = Router();

routerReserva.get("/reserva", getReservas);
routerReserva.get("/reserva/:id", getReservaById);
routerReserva.get("/historicoReservas", getHistoricoReservas);
routerReserva.post("/reserva", postReserva);
routerReserva.patch("/reserva/:id", putReserva);
routerReserva.patch("/deletarReseva/:id", deleteReserva)

export default routerReserva