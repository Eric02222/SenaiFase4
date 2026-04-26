import db from "../config/db.js";
import bcrypt from "bcrypt";

const createFuncionario = async (req, res) => {
  try {
    const { nome, email, senha, cpf, endereco, numero_telefone, ativo } = req.body;
    if (
      nome.length < 5 ||
      email.length < 5 ||
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
      "INSERT INTO funcionario (nome, email, senha, cpf, endereco, numero_telefone, ativo) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [nome, email, hashPassword, cpf, endereco, numero_telefone, ativo],
    );

    if (result.affectedRows === 0) {
      return res.status(400).json({
        message: "Não foi possivel inserir o funcionario",
        success: false,
      });
    }

    return res
      .status(201)
      .json({ message: "Funcionario cadastrado com sucesso", success: true });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Erro ao criar funcionario", error: error.message });
  }
};

const getfuncionario = async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM funcionario");
        return res.status(200).json({ success: true, data: rows });
    } catch (error) {
        console.error("Erro ao buscar funcionario:", error);
        return res.status(500).json({ message: "Erro ao buscar funcionario", error: error.message });
    }
}

const getfuncionarioById = async (req, res) => {
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

const esqueciSenha = async (req, res) => {
    try {
        const email = req.body.email
        const senha = req.body.novaSenha
        const confirmar_senha = req.body.confirmarSenha


        if (email === "") {
            return res.status(400).json({ message: "Email não deve estar vazio. Ele é obrigatório.", success: false })
        }

        if (senha === "") {
            return res.status(400).json({ message: "Senha não deve estar vazio. Ela é obrigatório.", success: false })
        } else {
            if (senha.length < 6 || senha.length > 12) {
                return res.status(400).json({ message: "A senha deve somente de 6 a 12 caracteres.", success: false })

            };
        };

        if (confirmar_senha === "") {
            return res.status(400).json({ message: "O campo confirmar senha é obrigatório. Não deve estar vazio.", success: false })
        } else {
            if (confirmar_senha !== senha) {
                return res.status(400).json({ message: "O campo confirmar senha não é igual a senha. Tente novamente.", success: false })
            };
            const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,12}$/;

            if (!regex.test(senha)) {
                return res.status(400).json({ message: "A senha não corresponde as regras impostas para uma senha forte", success: false })
            };
        };

        const [row] = await db.query("SELECT id_funcionario FROM funcionario WHERE email = ?", [email]);

        if (row.length === 0) {
            return res.status(400).json({ message: "Esse ussuário não foi encontrado", success: false })
        }

        const user = row[0];

        const saltRound = 10;
        const hashPassword = await bcrypt.hash(senha, saltRound)

        const [result] = await db.query("UPDATE funcionario SET senha = ? WHERE id_funcionario = ?", [hashPassword, user.id])

        if (result.affectedRows === 0) {
            return res.status(400).json({ message: "Não foi possivel resetar a sua senha. Tente novamente.", success: false })
        }

        return res.status(201).json({ message: "Senha atualizada com sucesso", success: true })
    } catch (error) {
        return res.status(500).json({ message: "Erro ao criar funcionario", error: error.message })
    }
}

const editarfuncionario = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, email, senha, cpf, endereco, numero_telefone, ativo } = req.body;

        if (!id) {
            return res.status(400).json({ message: "O ID do funcionario é obrigatório.", success: false });
        }

        if (!nome || !email || nome === "" || email === "") {
            return res.status(400).json({ message: "Nome e email são obrigatórios e não podem estar vazios.", success: false });
        }

        const saltRound = 10;
        const hashPassword = await bcrypt.hash(senha, saltRound)

        const [result] = await db.query(
            "UPDATE funcionario SET nome = ?, email = ?, cpf = ?, endereco = ?, numero_telefone = ?, ativo = ? WHERE id_funcionario = ?",
            [nome, email, cpf, endereco, numero_telefone, ativo, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Funcionario não encontrado ou nenhuma alteração foi feita.", success: false });
        }

        return res.status(200).json({ message: "Funcionario atualizado com sucesso.", success: true });
    } catch (error) {
        console.error("Erro ao editar funcionario:", error);
        return res.status(500).json({ message: "Erro interno ao atualizar funcionario.", error: error.message });
    }
}

const excluirfuncionario = async (req, res) => {
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

export {createFuncionario, getfuncionario, getfuncionarioById, esqueciSenha, editarfuncionario, excluirfuncionario};