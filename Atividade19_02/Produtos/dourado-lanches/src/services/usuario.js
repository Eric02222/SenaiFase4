import { api } from './api.js'

export async function getUsuarios() {
    const res = await api.get("/usuario")
    if (res.status === 200) {
        return res.data?.data ?? [];
    }
    return [];
}

export async function getUsuariosPorId(id) {
    const res = await api.get(`/usuario/${id}`)
    if (res.status === 200) {
        return res.data?.data ?? [];
    }
    return [];
}


export async function postUsuario(usuario) {
    const res = await api.post(`/registro`, usuario);

    let r = "";
    if (res.status === 200) {
        r = res.message;
    }
    return res.data;
}

export async function patchUsuario(id, usuario) {
    const res = await api.patch(`/usuario/${id}`, usuario);

    let r = "";
    if (res.status === 200) {
        r = res.message;
    }
    return res.data;
}

export async function deleteUsuario(id) {
    const res = await api.delete(`/usuario/${id}`);

    let r = "";
    if (res.status === 200) {
        r = res.message;
    }
    return res.data;
}

