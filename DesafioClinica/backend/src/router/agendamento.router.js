import { Router } from "express";
import { 
    novoAgendamento, 
    listarAgendamentos, 
    deletarAgendamento, 
    atualizarAgendamento 
} from "../controller/agendamento.controller.js";

const routerAgendamento = Router();

routerAgendamento.post("/agendamento", novoAgendamento);
routerAgendamento.get("/agendamentos", listarAgendamentos);
routerAgendamento.delete("/agendamento/:id", deletarAgendamento);
routerAgendamento.put("/agendamento/:id", atualizarAgendamento);

export { routerAgendamento };
