import {api} from "./api.js"

export async function login(data) {
    const res = await api.get('/login', data)
    if (res.status === 200) {
        return res.data?.data ?? [];
    }
    return [];
}
