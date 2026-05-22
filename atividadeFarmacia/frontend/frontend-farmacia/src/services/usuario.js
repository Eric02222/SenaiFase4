import { api } from "./api"


export async function loginUser(data) {
    try {
        const res = await api.post("/login", data)
        return res.data
    } catch (error) {
        console.log('Erro ao logar', error)

    }
}