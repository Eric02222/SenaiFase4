import db from "../../config/db.js";
import bcrypt from "bcrypt";
import { signAccessToken, signRefreshToken } from '../../utils/jwt.js';

const createUser = async (req, res) => {
    try {
        const { nome, email, senha, tipo_usuario } = req.body

        if (nome.length < 5 || email.length < 5 || nome === "" || email === "" || senha === "") {
            return res.status(400).json({ message: "Todos os campos devem ser preenchidos", success: false })
        }

        const saltRound = 10;
        const hashPassword = await bcrypt.hash(senha, saltRound) //senha convertida para hash - criptografa a senha

        const [result] = await db.query("INSERT INTO usuario (nome, email, senha, tipo_usuario) VALUES (?, ?, ?, ?)", [nome, email, hashPassword, tipo_usuario])

        if (result.affectedRows === 0) {
            return res.status(400).json({ message: "Não foi possivel inserir o usuario", success: false })
        }

        return res.status(201).json({ message: "Usuario cadastrado com sucesso", success: true })
    } catch (error) {
        return res.status(500).json({ message: "Erro ao criar usuario", error: error.message })
    }
}


const loginUser = async (req, res) => {
    try {
        const { email, senha } = req.body

        if (!email || !senha) {
            return res.status(400).json({ message: "Email e senha são obrigatórios.", success: false });
        }

        const [rows] = await db.query("SELECT id, nome, email, senha FROM usuario WHERE email = ?", [email])

        if (rows.length === 0) {
            return res.status(401).json({ message: "Credenciais inválidas.", success: false });
        }

        const usuario = rows[0];

        if (!usuario || !(await bcrypt.compare(senha, usuario.senha))) {
            console.log("teste", usuario)
            return res.status(401).json({ error: "Credenciais inválidas", success: false });
        }

        const accessToken = signAccessToken({
            usuarioId: usuario.id,
            email: usuario.email,
            nome: usuario.nome,

        });

        const refreshToken = signRefreshToken({
            usuarioId: usuario.id,
            email: usuario.email,
            nome: usuario.nome,

        });

        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7);
        console.log(refreshToken)

        await db.query("INSERT INTO token (token, type, usuario, expiresAt) VALUES (?, ?, ?, ?)", [refreshToken, "refresh", usuario.id, expiresAt])

        res.status(200).json({
            accessToken,
            refreshToken,
            usuario: {
                usuarioId: usuario.id,
                email: usuario.email,
                nome: usuario.nome,

            },
        }).json({ message: "Usuario logado com sucesso" });
    } catch (error) {
        console.error("Erro no login:", error);
        return res.status(500).json({ message: "Erro ao criar usuario", error: error.message })
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

        const [row] = await db.query("SELECT id FROM usuario WHERE email = ?", [email]);

        if (row.length === 0) {
            return res.status(400).json({ message: "Esse ussuário não foi encontrado", success: false })
        }

        const user = row[0];

        const saltRound = 10;
        const hashPassword = await bcrypt.hash(senha, saltRound) //senha convertida para hash - criptografa a senha

        const [result] = await db.query("UPDATE usuario SET senha = ? WHERE id = ?", [hashPassword, user.id])

        if (result.affectedRows === 0) {
            return res.status(400).json({ message: "Não foi possivel resetar a sua senha. Tente novamente.", success: false })
        }

        return res.status(201).json({ message: "Senha atualizada com sucesso", success: true })
    } catch (error) {
        return res.status(500).json({ message: "Erro ao criar usuario", error: error.message })
    }
}

export { createUser, loginUser, esqueciSenha };