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

export async function postAgendamento(data) {
    const res = await api.post("/agendamento", data)

    let ok = ""
    if(res.status === 201) {
        ok = res.message;
    }
    return ok
}

export async function getAgendamentoByClientId(id) {
    const res = await api.get(`/agendamentoCliente/${id}`)
    if(res.status === 200){
        return res.data?.data ?? []
    }
    return []
}


export async function exclusaoAgenda(id) {
    const res = await api.patch(`/agendamentoExclusao/${id}`)

    let ok = ""
    if(res.status === 201) {
        ok = res.message;
    }
    return ok
}