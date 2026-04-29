import { api } from "./api.js";

export async function getAgendamento() {
    const res = await api.get('/agendamento')
    if(res.status === 200){
        return res.data?.data ?? []
    }
    return []
}

export async function getAgendamentoById(id) {
    const res = await api.get(`/agendamento/${id}`)
    if(res.status === 200){
        return res.data?.data ?? []
    }
    return []
}