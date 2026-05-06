import {api} from "./api.js"

export async function getQuartos() {
    const res = await api.get("/quarto")
    if (res.status === 200) {
        return res.data?.data ?? [];
    }
    return [];
}

export async function getQuartosById(id) {
    const res = await api.get(`/quarto/${id}`)
    if (res.status === 200) {
        return res.data?.data ?? [];
    }
    return [];
}


export async function postQuartos(quarto) {
    const res = await api.post("/quarto", quarto)

    let r = "";
    if (res.status === 201) {
        r = res.message;
    }

    return r;
}

export async function putQuartos(id, quarto) {
    const res = await api.put(`/quarto/${id}`, quarto)

    let r = "";
    if (res.status === 201) {
        r = res.message;
    }

    return r;
}

export async function deleteQuartos(id) {
    const res = await api.delete(`/quarto/${id}`)

    let r = "";
    if (res.status === 201) {
        r = res.message;
    }

    return r;
}