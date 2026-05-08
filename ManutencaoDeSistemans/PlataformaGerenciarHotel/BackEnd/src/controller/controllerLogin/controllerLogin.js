import db from "../../config/db.js";
import bcrypt from "bcrypt";

const loginUser = async (req, res) => {
    try {
        const { email, senha } = req.body

        if (!email || !senha) {
            return res.status(400).json({ message: "Email e senha são obrigatórios.", success: false });
        }

        const [rows] = await db.query("SELECT id_cliente, nome, email, senha, cpf, numero_telefone FROM cliente WHERE email = ?", [email])

        if (rows.length === 0) {
            return res.status(401).json({ message: "Credenciais inválidas.", success: false });
        }

        const usuario = rows[0];

        if (!usuario || !(await bcrypt.compare(senha, usuario.senha))) {
            console.log("teste", usuario)
            return res.status(401).json({ error: "Credenciais inválidas", success: false });
        }

        res.status(200).json({
            usuario: {
                id_cliente: usuario.id_cliente,
                email: usuario.email,
                nome: usuario.nome,
            },
        }).json({ message: "Usuario logado com sucesso" });
    } catch (error) {
        console.error("Erro no login:", error);
        return res.status(500).json({ message: "Erro ao criar usuario", error: error.message })
    }
}

const loginUserFuncionario = async (req, res) => {
    try {
        const { email, senha } = req.body

        if (!email || !senha) {
            return res.status(400).json({ message: "Email e senha são obrigatórios.", success: false });
        }

        const [rows] = await db.query("SELECT id_funcionario, nome, email, senha, cpf, numero_telefone FROM funcionario WHERE email = ?", [email])

        if (rows.length === 0) {
            return res.status(401).json({ message: "Credenciais inválidas.", success: false });
        }

        const usuario = rows[0];

        if (!usuario || !(await bcrypt.compare(senha, usuario.senha))) {
            console.log("teste", usuario)
            return res.status(401).json({ error: "Credenciais inválidas", success: false });
        }

        res.status(200).json({
            usuario: {
                id_funcionario: usuario.id_funcionario,
                email: usuario.email,
                nome: usuario.nome,
            },
        }).json({ message: "Usuario logado com sucesso" });
    } catch (error) {
        console.error("Erro no login:", error);
        return res.status(500).json({ message: "Erro ao criar usuario", error: error.message })
    }
}


export { loginUser, loginUserFuncionario };