import { Router } from "express";
import jwt from "jsonwebtoken"; // Corrigido de jtw para jwt

const router = Router();

// Nesta variável substitua pela consulta do banco de dados no futuro
const refreshTokenValidate = new Set();

function gerarToken(payload) {
    const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET, { expiresIn: '10s' });
    const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET, { expiresIn: '7d' });

    refreshTokenValidate.add(refreshToken);

    return {
        accessToken,
        refreshToken
    };
}

// Rota de login -> http://localhost:8081/auth/login
router.post('/login', (req, res) => {
    const { email, senha } = req.body;

    // Simulador
    if (email !== "aluno@senai.com.br" || senha !== "abc123") { // Corrigido senia para senai (assumindo typo)
        return res.status(401).json({ message: "Credenciais inválidas" });
    }

    // Agora o { email } passado aqui é recebido pelo parâmetro "payload" na função
    const { accessToken, refreshToken } = gerarToken({ email });

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,  // Protege contra XSS (não acessível via document.cookie)
        secure: false,   // Trocar para true quando for subir para produção (HTTPS)
        sameSite: "strict", // Proteção contra CSRF
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 dias em milissegundos
    });

    res.json({ accessToken });
});

// Rota de refresh token -> http://localhost:8081/auth/refresh
router.post('/refresh', (req, res) => {
    const refreshToken = req.cookies?.refreshToken; // Usa optional chaining por segurança

    // Se o refresh token for vazio
    if (!refreshToken) {
        return res.status(401).json({ message: "Não há refresh token" });
    }

    // Se o token não estiver na "lista" de tokens válidos
    if (!refreshTokenValidate.has(refreshToken)) {
        return res.status(401).json({ message: "Refresh token é inválido ou foi revogado" });
    }

    try {
        // Desestrutura retirando os campos padrão do JWT antigo (iat, exp) para não dar conflito na nova assinatura
        const { iat, exp, ...payload } = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
        
        // Gera um novo Access Token
        const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET, { expiresIn: "10s" });
        
        res.json({ accessToken });
    } catch (error) {
        // Se cair aqui, o token expirou ou a assinatura é inválida
        return res.status(403).json({ message: "Refresh token é inválido ou expirado" });
    }
});

export default router;