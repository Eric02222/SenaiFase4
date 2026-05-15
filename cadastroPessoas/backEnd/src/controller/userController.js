import db from "../config/db.js";
import bcrypt from 'bcrypt'

const createUser = async (req, res) => {
    try {
        const { nome, email, senha, cpf_cnpj } = req.body;

        if (cpf_cnpj.length === 11) {
            console.log("CPF enviado")
        } else if (cpf_cnpj.length === 14) {
            console.log("CNPJ enviado")
        }else {
            return res.status(400).json({ message: "CPF ou CNPJ informados invalidos!", success: false });
        }

        if (!nome || !email || !senha || !cpf_cnpj) {
            return res.status(400).json({ message: "Todos os dados devem ser preencidos!", success: false });
        }

        const saltRound = 10;
        const hashPassword = await bcrypt.hash(senha, saltRound);

        const [result] = await db.query("INSERT INTO usuario (nome, email, cpf_cnpj, senha) VALUES (?, ?, ?, ?)", [nome, email, cpf_cnpj, hashPassword]);

        if (result.affectedRows === 0) {
            return res.status(400).json({ message: "Não foi possivel criar usuario", success: false });
        }

        return res.status(201).json({ message: "Usuario criado com sucesso!", success: true });
    } catch (error) {
        return res.status(500).json({ message: "Erro ao criar usuario!", error: error.message });

    }

};

const getUsuario = async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM usuario");
        return res.status(200).json({ success: true, data: rows });
    } catch (error) {
        console.error("Erro ao buscar usuario:", error);
        return res.status(500).json({ message: "Erro ao buscar usuario", error: error.message });
    }
}

export { createUser, getUsuario };