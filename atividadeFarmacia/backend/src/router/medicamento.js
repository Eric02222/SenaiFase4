import { Router } from "express"
import { editaMedicamento, excluiMedicamento, mostraMedicamentos, novoMedicamento } from "../controller/medicamento.controller.js";

const routerMedicamentos = Router();

routerMedicamentos.post("/medicamentos", novoMedicamento)
routerMedicamentos.get("/medicamentos", mostraMedicamentos)
routerMedicamentos.delete("/medicamentos/:id", excluiMedicamento)
routerMedicamentos.patch("/medicamentos/:id", editaMedicamento)

export {routerMedicamentos};