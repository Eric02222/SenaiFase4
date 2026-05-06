import {api} from "./api.js"

export async function getReservas() {
    const res = await api.get("/reserva")
    if (res.status === 200) {
        return res.data?.data ?? [];
    }
    return [];
}

export async function getReservasById(id) {
    const res = await api.get(`/reserva/${id}`)
    if (res.status === 200) {
        return res.data?.data ?? [];
    }
    return [];
}

export async function getHistoricoReservas() {
    const res = await api.get("/historicoReservas")
    if (res.status === 200) {
        return res.data?.data ?? [];
    }
    return [];
}

export async function postReserva(data) {
    const res = await api.post("/reserva", data)

    let r = "";
    if (res.status === 201) {
        r = res.message;
    }

    return r;
}

export async function putReserva(id, data) {
    const res = await api.put(`/reserva/${id}`, data)

    let r = "";
    if (res.status === 201) {
        r = res.message;
    }

    return r;
}

export async function deleteReservas(id) {
    const res = await api.put(`/quarto/${id}`)

    let r = "";
    if (res.status === 201) {
        r = res.message;
    }

    return r;
}