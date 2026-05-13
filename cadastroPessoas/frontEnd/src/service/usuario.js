import { api } from "./api.js";

export async function createUser(data) {
    const res = await api.post("/usuario", data)

    let r = '';
    if(res.status === 201){
        r = res.message;
    }
    return r
}  

export async function getUser() {
    const res = await api.get("/usuario")
    if (res.status === 200) {
        return res.data?.data ?? [];
    }
    return [];
}
