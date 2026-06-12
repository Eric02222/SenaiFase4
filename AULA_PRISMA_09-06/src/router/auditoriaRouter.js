import { Router } from "express";
import { atualizarUsuarioComAuditoria, criarUsuarioComAuditoria, deletarUsuarioComAuditoria } from "../controller/auditoria.controller.js";

export const auditoriaRouter = Router();

auditoriaRouter.post("/auditoria", criarUsuarioComAuditoria)
auditoriaRouter.put("/auditoria/:id", atualizarUsuarioComAuditoria)
auditoriaRouter.delete("/auditoria/:id", deletarUsuarioComAuditoria)