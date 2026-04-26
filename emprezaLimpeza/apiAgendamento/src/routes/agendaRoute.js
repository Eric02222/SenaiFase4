import express from "express";
import {
  postAgenda,
  getAgenda,
  getAgendaById,
  editarAgenda,
  excluirAgenda,
} from "../controller/agendaController";


const agendaRoutes = express.Router();

agendaRoutes.post("/agendamento", postAgenda);

agendaRoutes.get("/agendamento", getAgenda);

agendaRoutes.get("/agendamento/:id", getAgendaById);

agendaRoutes.patch("/agendamento/:id", editarAgenda);

agendaRoutes.patch("/agendamento/:id", excluirAgenda);

export default agendaRoutes;


