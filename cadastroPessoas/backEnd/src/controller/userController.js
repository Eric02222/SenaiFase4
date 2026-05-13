import db from "../config/db.js";
import bcrypt from 'bcrypt'

const createUser = async (req, res) => {
    try {
        const { nome, email, senha, cpf } = req.body;

        if (!nome || !email || !senha || !cpf) {
            return res.status(400).json({ message: "Todos os dados devem ser preencidos!", success: false });
        }

        const saltRound = 10;
        const hashPassword = await bcrypt.hash(senha, saltRound);

        const [result] = await db.query("INSERT INTO usuario (nome, email, cpf, senha) VALUES (?, ?, ?, ?)", [nome, email, cpf, hashPassword]);

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