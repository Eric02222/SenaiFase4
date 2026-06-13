import { api } from "./api";

export const novoAgendamento = async (data) => {
    return await api.post(`/agendamento`, data);
};

export const listarAgendamentos = async () => {
    return await api.get(`/agendamentos`);
};

export const deletarAgendamento = async (id) => {
    return await api.delete(`/agendamento/${id}`);
};

export const atualizarAgendamento = async (id, data) => {
    return await api.put(`/agendamento/${id}`, data);
};
