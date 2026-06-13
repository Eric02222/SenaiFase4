import { api } from "./api";

export const loginUser = async (data) => {
    return await api.post(`/login`, data);
};

export const novoUsuario = async (data) => {
    return await api.post(`/usuario`, data);
};

export const listarUsuarios = async () => {
    return await api.get(`/usuarios`);
};

export const deletarUsuario = async (id) => {
    return await api.delete(`/usuario/${id}`);
};

export const atualizarUsuario = async (id, data) => {
    return await api.put(`/usuario/${id}`, data);
};

export const recuperarSenha = async (data) => {
    return await api.post(`/recuperar-senha`, data);
};

export const buscarUsuarioPorCpf = async (cpf) => {
    return await api.get(`/usuario/${cpf}`);
};
