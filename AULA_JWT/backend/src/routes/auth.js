import { Router } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"
import { db } from "../config/db.js"

const routerAuth = Router();

//gera par de tokens
function gerarToken(payload) {
    //expira com 30 segundos em desenvolvimento e expira com 15 minutos em produção
    const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET, { expiresIn: '30s' });
    const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET, { expiresIn: '7d' });

    return {
        accessToken,
        refreshToken
    };
}

//Retorna data daqui tantos dias (para salvar no banco como data de expiração)
function dataExpiração(dias = 7) {
    const data = new Date();
    data.setDate(data.getDate() + dias);
    return data;
}

routerAuth.post("/registrar", async (req, res) => {
    const { email, senha } = req.body;
    const [linhas] = await db.query("SELECT id FROM usuarios WHERE email = ?", [email]);

    if (linhas.lenght > 0) {
        return res.status(409).json({ message: "Email já cadastrado" });
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    const [result] = await db.query("INSERT INTO usuarios (email, senha) VALUES (?, ?)", [email, senhaHash]);

    return res.status(201).json({ message: "Usuário criado com sucesso", id: result.insertId });
})

// Rota de login -> http://localhost:8081/auth/login
routerAuth.post('/login', async (req, res) => {
    const { email, senha } = req.body;

    const [linhas] = await db.query("SELECT * FROM usuarios WHERE email = ?", [email])
    const usuario = linhas[0]

    if (!usuario) {
        return res.status(401).json({ message: "Credenciais inválidas" });
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha)

    if (!senhaCorreta) {
        return res.status(401).json({ message: "Credenciais inválidas" });
    }


    // Agora o { email } passado aqui é recebido pelo parâmetro "payload" na função
    const { accessToken, refreshToken } = gerarToken({ id: usuario.id, email: usuario.email });

    const [result] = await db.query("INSERT INTO refresh_tokens (token, usuario_id, expira_em) VALUES (?, ?, ?)", [refreshToken, usuario.id, dataExpiração()]);


    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,  // Protege contra XSS (não acessível via document.cookie)
        secure: false,   // Trocar para true quando for subir para produção (HTTPS)
        sameSite: "strict", // Proteção contra CSRF
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 dias em milissegundos
    });

    res.json({ accessToken });
});

// Rota de refresh token -> http://localhost:8081/auth/refresh
routerAuth.post('/refresh', async (req, res) => {
    const refreshToken = req.cookies?.refreshToken; // Usa optional chaining por segurança

    // Se o refresh token for vazio
    if (!refreshToken) {
        return res.status(401).json({ message: "Não há refresh token" });
    }

    const [linhas] = await db.query("SELECT * FROM refresh_tokens WHERE token = ?", [refreshToken]);
    const tokenExite = linhas[0]

    // Se o token não estiver na "lista" de tokens válidos
    if (!tokenExite) {
        return res.status(403).json({ message: "Refresh token é inválido ou foi revogado" });
    }

    let date = new Date();

    //verifica se o token expirou pela data do banco
    if (new Date(tokenExite.expira_em) < new Date()) {
        await db.query("DELETE FROM refresh_tokens WHERE token = ?", [refreshToken])
        return res.status(403).json({ message: "Refresh token expirado" });
    }

    try {
        // Desestrutura retirando os campos padrão do JWT antigo (iat, exp) para não dar conflito na nova assinatura
        const { iat, exp, ...payload } = jwt.verify(refreshToken, process.env.REFRESH_SECRET);

        // Gera um novo Access Token
        const novoAccessToken = jwt.sign(payload, process.env.ACCESS_SECRET, { expiresIn: "1m" });

        res.json({ accessToken });
    } catch (error) {
        // Se cair aqui, o token expirou ou a assinatura é inválida
        return res.status(403).json({ message: "Refresh token é inválido ou expirado" });
    }
});

export default routerAuth;