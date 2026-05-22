import { api } from "./api.js"

export async function mostarMedicamentos() {
    const res = await api.get("/medicamentos")
    if (res.status === 200) {
        return res.data?.data ?? [];
    }
    return [];
} 

export async function postMedicamento(data) {
    const res = await api.post("/medicamentos", data)

    let r = "";
    if (res.status == 201) {
        r = res.message;
    }

    return r;
}


export async function patchMedicamento(id, data) {
    const res = await api.patch(`/medicamentos/${id}`, data)

    let r = "";
    if (res.status == 200) {
        r = res.message;
    }

    return r;
}