import database from "../config/database.js";
import bcrypt from "bcrypt";

const saltRounds = 10;

export const novoUsuario = async (req, res) => {
    try {
        const { nome, cpf, senha, funcao, pergunta_seguranca, resposta_seguranca } = req.body;

        if (!nome || !cpf || !senha || !funcao) {
            return res.status(400).json({
                success: false,
                message: "Preencha todos os campos obrigatórios (nome, cpf, senha, funcao)."
            });
        }

        const hashedPassword = await bcrypt.hash(senha, saltRounds);

        const [resultado] = await database.query(
            `INSERT INTO usuario (nome, cpf, senha, funcao, pergunta_seguranca, resposta_seguranca) VALUES (?, ?, ?, ?, ?, ?)`,
            [nome, cpf, hashedPassword, funcao, pergunta_seguranca, resposta_seguranca]
        );

        return res.status(201).json({
            success: true,
            message: "Usuário cadastrado com sucesso.",
            id: resultado.insertId
        });
    } catch (error) {
        console.error(error);
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ success: false, message: "CPF já cadastrado." });
        }
        return res.status(500).json({
            success: false,
            message: "Erro ao cadastrar usuário.",
            error: error.message
        });
    }
}

export const loginUsuario = async (req, res) => {
    try {
        const { cpf, senha } = req.body;

        if (!cpf || !senha) {
            return res.status(400).json({
                success: false,
                message: "Informe o CPF e a senha."
            });
        }

        const [rows] = await database.query("SELECT * FROM usuario WHERE cpf = ?", [cpf]);

        if (rows.length === 0) {
            return res.status(401).json({ message: "Usuário não encontrado.", success: false });
        }

        const usuario = rows[0];
        const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

        if (!senhaCorreta) {
            return res.status(401).json({ message: "Senha incorreta.", success: false });
        }

        res.status(200).json({
            success: true,
            message: "Login realizado com sucesso",
            usuario: {
                id: usuario.id,
                cpf: usuario.cpf,
                nome: usuario.nome,
                funcao: usuario.funcao
            },
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Erro ao logar usuário.",
            error: error.message
        });
    }
}

export const listarUsuarios = async (req, res) => {
    try {
        const [rows] = await database.query("SELECT id, nome, cpf, funcao, pergunta_seguranca FROM usuario");
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ success: false, message: "Erro ao listar usuários.", error: error.message });
    }
}

export const buscarUsuarioPorCpf = async (req, res) => {
    try {
        const { cpf } = req.params;
        const [rows] = await database.query("SELECT id, nome, cpf, funcao, pergunta_seguranca FROM usuario WHERE cpf = ?", [cpf]);
        if (rows.length === 0) return res.status(404).json({ success: false, message: "Usuário não encontrado." });
        res.status(200).json(rows[0]);
    } catch (error) {
        res.status(500).json({ success: false, message: "Erro ao buscar usuário.", error: error.message });
    }
}

export const deletarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        await database.query("DELETE FROM usuario WHERE id = ?", [id]);
        res.status(200).json({ success: true, message: "Usuário deletado com sucesso." });
    } catch (error) {
        res.status(500).json({ success: false, message: "Erro ao deletar usuário.", error: error.message });
    }
}

export const atualizarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, cpf, funcao, senha } = req.body;
        
        let query = "UPDATE usuario SET nome = ?, cpf = ?, funcao = ?";
        let params = [nome, cpf, funcao];

        if (senha) {
            const hashedPassword = await bcrypt.hash(senha, saltRounds);
            query += ", senha = ?";
            params.push(hashedPassword);
        }

        query += " WHERE id = ?";
        params.push(id);

        await database.query(query, params);
        res.status(200).json({ success: true, message: "Usuário atualizado com sucesso." });
    } catch (error) {
        res.status(500).json({ success: false, message: "Erro ao atualizar usuário.", error: error.message });
    }
}

export const recuperarSenha = async (req, res) => {
    try {
        const { cpf, resposta_seguranca, nova_senha } = req.body;
        const [rows] = await database.query("SELECT * FROM usuario WHERE cpf = ?", [cpf]);
        
        if (rows.length === 0) return res.status(404).json({ success: false, message: "Usuário não encontrado." });

        const usuario = rows[0];
        if (usuario.resposta_seguranca !== resposta_seguranca) {
            return res.status(401).json({ success: false, message: "Resposta de segurança incorreta." });
        }

        const hashedPassword = await bcrypt.hash(nova_senha, saltRounds);
        await database.query("UPDATE usuario SET senha = ? WHERE id = ?", [hashedPassword, usuario.id]);

        res.status(200).json({ success: true, message: "Senha alterada com sucesso." });
    } catch (error) {
        res.status(500).json({ success: false, message: "Erro ao recuperar senha.", error: error.message });
    }
}
