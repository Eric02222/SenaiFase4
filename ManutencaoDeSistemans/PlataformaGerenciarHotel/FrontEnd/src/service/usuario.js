import {api} from "./api.js"

export async function getUsuario() {
    const res = await api.get("/usuario")
    if (res.status === 200) {
        return res.data?.data ?? [];
    }
    return [];
}

export async function getUsuarioById(id) {
    const res = await api.get(`/usuario/${id}`)
    if (res.status === 200) {
        return res.data?.data ?? [];
    }
    return [];
}


export async function postUsuario(data) {
    const res = await api.post("/usuario", data)

    let r = "";
    if (res.status === 201) {
        r = res.message;
    }

    return r;
}

export async function putUsuario(data) {
    const res = await api.put(`/usuario/${id}`, data)

    let r = "";
    if (res.status === 201) {
        r = res.message;
    }

    return r;
}

export async function deleteUsuario(id) {
    const res = await api.delete(`/usuario/${id}`)

    let r = "";
    if (res.status === 201) {
        r = res.message;
    }

    return r;
}