import {api} from "./api.js"

export async function getFuncionario() {
    const res = await api.get("/funcionario")
    if (res.status === 200) {
        return res.data?.data ?? [];
    }
    return [];
}

export async function getFuncionarioById(id) {
    const res = await api.get(`/funcionario/${id}`)
    if (res.status === 200) {
        return res.data?.data ?? [];
    }
    return [];
}

export async function getFuncionarioByEmail(email) {
    const res = await api.get(`/funcionario/email/${email}`)
    if (res.status === 200) {
        return res.data?.data ?? [];
    }
    return [];
}

export async function postFuncionario(data) {
    const res = await api.post("/funcionario", data)

    let r = "";
    if (res.status === 201) {
        r = res.message;
    }

    return r;
}

export async function putFuncionario(data) {
    const res = await api.put(`/funcionario/${id}`, data)

    let r = "";
    if (res.status === 201) {
        r = res.message;
    }

    return r;
}

export async function deleteFuncionario(id) {
    const res = await api.delete(`/funcionario/${id}`)

    let r = "";
    if (res.status === 201) {
        r = res.message;
    }

    return r;
}