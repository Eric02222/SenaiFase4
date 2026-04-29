import db from "../config/db.js";
import bcrypt from "bcrypt";

const createCliente = async (req, res) => {
  try {
    const { nome, email, senha, cpf, endereco, numero_telefone } = req.body;
    if (
      nome === "" ||
      email === "" ||
      senha === "" ||
      cpf === "" ||
      endereco === "" ||
      numero_telefone === ""
    ) {
      return res.status(400).json({
        message: "Todos os campos devem ser preenchidos",
        success: false,
      });
    }

    const saltRound = 10;
    const hashPassword = await bcrypt.hash(senha, saltRound);

    const [result] = await db.query(
      "INSERT INTO cliente (nome, email, senha, cpf, endereco, numero_telefone) VALUES (?, ?, ?, ?, ?, ?)",
      [nome, email, hashPassword, cpf, endereco, numero_telefone],
    );

    if (result.affectedRows === 0) {
      return res.status(400).json({
        message: "Não foi possivel inserir o cliente",
        success: false,
      });
    }

    return res
      .status(201)
      .json({ message: "Cliente cadastrado com sucesso", success: true });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Erro ao criar cliente", error: error.message });
  }
};

const getCliente = async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM cliente");
        return res.status(200).json({ success: true, data: rows });
    } catch (error) {
        console.error("Erro ao buscar cliente:", error);
        return res.status(500).json({ message: "Erro ao buscar cliente", error: error.message });
    }
}

const getClienteById = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await db.query("SELECT * FROM cliente WHERE id_cliente = ?", [id]);

        if (rows.length === 0) {
            return res.status(404).json({ message: "Cliente não encontrado", success: false });
        }

        return res.status(200).json({ success: true, data: rows[0] });
    } catch (error) {
        console.error("Erro ao buscar cliente:", error);
        return res.status(500).json({ message: "Erro ao buscar cliente", error: error.message });
    }
}


const editarCliente = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, email, senha, cpf, endereco, numero_telefone } = req.body;

        if (!id) {
            return res.status(400).json({ message: "O ID do cliente é obrigatório.", success: false });
        }

        if (!nome || !email || nome === "" || email === "") {
            return res.status(400).json({ message: "Nome e email são obrigatórios e não podem estar vazios.", success: false });
        }

        const saltRound = 10;
        const hashPassword = await bcrypt.hash(senha, saltRound)

        const [result] = await db.query(
            "UPDATE cliente SET nome = ?, email = ?, cpf = ?, endereco = ?, numero_telefone = ? WHERE id_cliente = ?",
            [nome, email, cpf, endereco, numero_telefone, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Cliente não encontrado ou nenhuma alteração foi feita.", success: false });
        }

        return res.status(200).json({ message: "Cliente atualizado com sucesso.", success: true });
    } catch (error) {
        console.error("Erro ao editar cliente:", error);
        return res.status(500).json({ message: "Erro interno ao atualizar cliente.", error: error.message });
    }
}

const excluirCliente = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "O ID do cliente é obrigatório.", success: false });
        }

        const [result] = await db.query("DELETE FROM cliente WHERE id_cliente = ?", [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Cliente não encontrado.", success: false });
        }

        return res.status(200).json({ message: "Cliente excluído com sucesso.", success: true });
    } catch (error) {
        console.error("Erro ao excluir cliente:", error);
        return res.status(500).json({ message: "Erro interno ao excluir cliente.", error: error.message });
    }
}

export {createCliente, getCliente, getClienteById, editarCliente, excluirCliente};