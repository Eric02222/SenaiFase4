import { Router } from "express";
import { deleteReserva, getHistoricoReservas, getReservaById, getReservas, postReserva, putReserva } from "../../controller/controllerReserva/controllerReserva";


const routerReserva = Router();

routerReserva.get("/reserva", getReservas);
routerReserva.get("/reserva/:id", getReservaById);
routerReserva.get("/historicoReservas", getHistoricoReservas);
routerReserva.post("/reserva", postReserva);
routerReserva.put("/reserva/:id", putReserva);
routerReserva.put("/deletarReseva/:id", deleteReserva)

export default routerReserva