import db from "../../config/db.js";
import bcrypt from "bcrypt";

const createFuncionario = async (req, res) => {
    try {
        const { nome, email, senha, cpf, numero_telefone } = req.body

        if (nome === "" || email === "" || senha === "") {
            return res.status(400).json({ message: "Todos os campos devem ser preenchidos", success: false })
        }

        const saltRound = 10;
        const hashPassword = await bcrypt.hash(senha, saltRound)

        const [result] = await db.query("INSERT INTO funcionario (nome, email, senha, cpf, numero_telefone) VALUES (?, ?, ?, ?, ?)", [nome, email, hashPassword, cpf, numero_telefone])

        if (result.affectedRows === 0) {
            return res.status(400).json({ message: "Não foi possivel inserir o funcionario", success: false })
        }

        return res.status(201).json({ message: "Funcionario cadastrado com sucesso", success: true })
    } catch (error) {
        return res.status(500).json({ message: "Erro ao criar Funcionario", error: error.message })
    }
}


const getFuncionarios = async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM funcionario");
        return res.status(200).json({ success: true, data: rows });
    } catch (error) {
        console.error("Erro ao buscar funcionario:", error);
        return res.status(500).json({ message: "Erro ao buscar funcionario", error: error.message });
    }
}

const getFuncionarioById = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await db.query("SELECT * FROM funcionario WHERE id_funcionario = ?", [id]);

        if (rows.length === 0) {
            return res.status(404).json({ message: "Funcionario não encontrado", success: false });
        }

        return res.status(200).json({ success: true, data: rows[0] });
    } catch (error) {
        console.error("Erro ao buscar funcionario:", error);
        return res.status(500).json({ message: "Erro ao buscar funcionario", error: error.message });
    }
}

const getFuncionarioByEmail = async (req, res) => {
    try {
        const { email } = req.params;
        const [rows] = await db.query("SELECT * FROM funcionario WHERE email = ?", [email]);

        if (rows.length === 0) {
            console.log(email)
            return res.status(404).json({ message: "Funcionario não encontrado", success: false });
        }

        return res.status(200).json({ success: true, data: rows[0] });
    } catch (error) {
        console.error("Erro ao buscar funcionario:", error);
        return res.status(500).json({ message: "Erro ao buscar funcionario", error: error.message });
    }
}

const editarFuncionario = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, email, cpf, numero_telefone } = req.body;

        if (!id) {
            return res.status(400).json({ message: "O ID do usuário é obrigatório.", success: false });
        }

        if (!nome || !email || nome === "" || email === "") {
            return res.status(400).json({ message: "Nome e email são obrigatórios e não podem estar vazios.", success: false });
        }

        const [result] = await db.query(
            "UPDATE funcionario SET nome = ?, email = ?, cpf = ?, numero_telefone = ? WHERE id_funcionario = ?",
            [nome, email, cpf, numero_telefone, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Funcionario não encontrado ou nenhuma alteração foi feita.", success: false });
        }

        return res.status(200).json({ message: "Funcionario atualizado com sucesso.", success: true });
    } catch (error) {
        console.error("Erro ao editar c:", error);
        return res.status(500).json({ message: "Erro interno ao atualizar c.", error: error.message });
    }
}

const excluirFuncionario = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "O ID do funcionario é obrigatório.", success: false });
        }

        const [result] = await db.query("DELETE FROM funcionario WHERE id_funcionario = ?", [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Funcionario não encontrado.", success: false });
        }

        return res.status(200).json({ message: "Funcionario excluído com sucesso.", success: true });
    } catch (error) {
        console.error("Erro ao excluir funcionario:", error);
        return res.status(500).json({ message: "Erro interno ao excluir funcionario.", error: error.message });
    }
}

export { createFuncionario, getFuncionarios, getFuncionarioById ,getFuncionarioByEmail ,editarFuncionario, excluirFuncionario };