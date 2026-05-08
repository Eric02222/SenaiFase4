import { api } from "./api.js"

export async function loginUserCliente(data) {
    try {
        const res = await api.post('/loginCliente', data)
        return res.data
    } catch (error) {
        console.log('Erro ao logar', error)
    }
}

export async function loginUserFuncionario(data) {
    try {
        const res = await api.post('/loginFuncionario', data)
        return res.data
    } catch (error) {
        console.log('Erro ao logar', error)
    }
}
