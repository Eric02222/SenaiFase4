import db from "../config/db.js";

class AuthController {
    constructor() { }

    async register(req, res) {
        try {

            const {
                nome, email, senha
            } = req.body;

            if (!email || !senha) {
                return res.status(400).json({ error: "Email e senha são obrigatórios" });
            }

            const [users] = await db.query("SELECT * FROM usuario WHERE email = ?", [email]);

            if (users.length > 0) {
                return res.status(409).json({ error: "Usuário já existe" });
            }

            const values = [
                nome, email, senha
            ];

            const [result] = await db.query(`INSERT INTO usuario (nome, email, senha) VALUES (?, ?, ?)`, values);

            return res.status(201).json({
                message: "Usuário criado com sucesso",
                usuario: {
                    id: result.insertId,
                    nome,
                    email
                }
            });

        } catch (error) {
            console.error("Erro no registro:", error);
            return res.status(500).json({ error: "Erro interno do servidor" });
        }
    }

    async login(req, res) {
        try {
            const { email, senha } = req.body;

            const [users] = await db.query("SELECT * FROM usuario WHERE email = ?", [email]);

            if (users.length === 0) {
                return res.status(401).json({ error: "Credenciais inválidas" });
            }

            const usuario = users[0];

            if (senha !== usuario.senha) {
                return res.status(401).json({ error: "Credenciais inválidas" });
            }

            delete usuario.senha;

            return res.status(200).json({
                message: "Login realizado com sucesso",
                usuario: usuario
            });

        } catch (error) {
            console.error("Erro no login:", error);
            return res.status(500).json({ error: "Erro interno do servidor" });
        }
    }
}

export const authController = new AuthController();