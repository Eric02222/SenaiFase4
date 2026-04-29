import { api } from "./api.js";

export async function getFuncionario() {
    const res = await api.get('/funcionario')
    if(res.status === 200){
        return res.data?.data ?? []
    }
    return []
}

export async function getFuncionarioById(id) {
    const res = await api.get(`/funcionario/${id}`)
    if(res.status === 200){
        return res.data?.data ?? []
    }
    return []
}