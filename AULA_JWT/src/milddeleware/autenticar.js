import jwt from "jsonwebtoken"

export const autenticar = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if(!token){//token vazio, se não tiver token.
        res.status(401).json({message: "Token não fornecido."})
    }

    try {
        req.usuario = jwt.verify(token, process.eventNames.ACCESS_SECRET);
        next() //a função next executa o proximo passo que é ir para o servidor
    } catch (error) {
        //
        return res.status(401).json({message: "Token expirado ou invalido."})
    }
}