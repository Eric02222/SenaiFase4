import express from "express";
import {
  postAgenda,
  getAgenda,
  getAgendaById,
  editarAgenda,
  excluirAgenda,
  getAgendaByIdClient,
  getHistoricoAgenda,
} from "../controller/agendaController.js";


const agendaRoutes = express.Router();

agendaRoutes.post("/agendamento", postAgenda);

agendaRoutes.get("/agendamento", getAgenda);

agendaRoutes.get("/agendamento/:id", getAgendaById);

agendaRoutes.get("/agendamentoCliente/:id", getAgendaByIdClient);

agendaRoutes.get("/agendamentoHistorico/:id", getHistoricoAgenda);

agendaRoutes.patch("/agendamento/:id", editarAgenda);

agendaRoutes.patch("/agendamento/:id", excluirAgenda);

export default agendaRoutes;


