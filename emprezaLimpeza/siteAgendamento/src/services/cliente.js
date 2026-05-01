import { api } from "./api.js";

export async function getCliente() {
    const res = await api.get('/cliente')
    if(res.status === 200){
        return res.data?.data ?? []
    }
    return []
}

export async function getClienteById(id) {
    const res = await api.get(`/cliente/${id}`)
    if(res.status === 200){
        return res.data?.data ?? []
    }
    return []
}

export async function getClienteByEmail(email) {
    console.log(email)
    const res = await api.get(`/cliente/email/${email}` )
    if(res.status === 200){
        return res.data?.data ?? []
    }
    return []
}

export async function criarCliente(data) {
    const res = await api.post('/cliente', data)

    let ok = "";
    if(res.status === 200){
        ok = res.message
    }
    return ok
}