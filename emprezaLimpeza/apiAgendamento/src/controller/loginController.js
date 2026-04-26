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
    return res;
    res
      .status(500)
      .json({ message: "Erro ao realizar login.", error: error.message });
  }
};

export {loginUser};