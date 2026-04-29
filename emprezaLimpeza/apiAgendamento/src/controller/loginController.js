import db from "../config/db.js";
import bcrypt from "bcrypt";

const loginUser = async (req, res) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res
        .status(400)
        .json({ message: "Email e senha são obrigatórios.", success: false });
    }

    const [rows] = await db.query(
      "SELECT id, nome, email, senha FROM cliente WHERE email = ?",
      [email],
    );

    if (rows.length === 0) {
      return res
        .status(401)
        .json({ message: "Credenciais inválidas.", success: false });
    }

    const usuario = rows[0];

    if (!usuario || !(await bcrypt.compare(senha, usuario.senha))) {
      console.log("teste", usuario);
      return res
        .status(401)
        .json({ error: "Credenciais inválidas", success: false });
    }

    const token = jwt.sign(
      {
        sub: user.id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      },
    );

    return res.json({
      message: "Login realizado com sucesso.",
      token,
    });
  } catch (error) {
    console.error("Erro no login:", error);
    res.status(500).json({ message: "Erro ao realizar login.", error: error.message });
    return res;
  }
};

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

        const [row] = await db.query("SELECT id_cliente FROM cliente WHERE email = ?", [email]);

        if (row.length === 0) {
            return res.status(400).json({ message: "Esse ussuário não foi encontrado", success: false })
        }

        const user = row[0];

        const saltRound = 10;
        const hashPassword = await bcrypt.hash(senha, saltRound)

        const [result] = await db.query("UPDATE cliente SET senha = ? WHERE id_cliente = ?", [hashPassword, user.id])

        if (result.affectedRows === 0) {
            return res.status(400).json({ message: "Não foi possivel resetar a sua senha. Tente novamente.", success: false })
        }

        return res.status(201).json({ message: "Senha atualizada com sucesso", success: true })
    } catch (error) {
        return res.status(500).json({ message: "Erro ao criar cliente", error: error.message })
    }
}


export { loginUser, esqueciSenha };