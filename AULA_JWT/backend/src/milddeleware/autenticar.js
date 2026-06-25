import jwt from "jsonwebtoken"

export function autenticar (req, res, next) {

    //token vem no cabeçalho da requisição
    const tokenRecebido = req.headers.authorization?.split(' ')[1];

    if(!tokenRecebido){//token vazio, se não tiver token.
        res.status(401).json({message: "Token não fornecido."})
    }

    try {
        //jwt.verify verifica a assinatura, se ela esta expirada ou valida
        const dadosUsuario = jwt.verify(tokenRecebido, process.env.ACCESS_SECRET);

        //injeta os dados do usuario na requisição para as rotas seguintes
        req.usuario = dadosUsuario;
        next() //a função next executa o proximo passo que é ir para o servidor
    } catch (error) {
        //
        return res.status(401).json({message: "Token expirado ou invalido."})
    }
}