import { api } from "./api.js"

export async function mostarMovimentacoes() {
    const res = await api.get("/movimentacao")
    if (res.status === 200) {
        return res.data?.data ?? [];
    }
    return [];
} 

export async function postMovimentacao(data) {
    const res = await api.post("/movimentacao", data)

    let r = "";
    if (res.status == 201) {
        r = res.message;
    }

    return r;
}


export async function patchMovimentacao(id, data) {
    const res = await api.patch(`/movimentacao/${id}`, data)

    let r = "";
    if (res.status == 200) {
        r = res.message;
    }

    return r;
}

export async function deleteMovimentacao(id) {
    const res = await api.delete(`/movimentacao/${id}`)

    let r = "";
    if (res.status === 201) {
        r = res.message;
    }

    return r;
}