import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()

export const conversar = async (req, res) => {
    try {
        const { mensagem } = req.body

        const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=' + process.env.GEMINI_API_KEY;
        const resposta = await axios.post(url, {
            contents: [{
                parts: [{
                    text: ` Você é um professor de programação, explique de forma simples e didatica com exemplos. Pergunta: ${mensagem}`
                }]
            }]
        })

        const texto = resposta.data.candidates[0].content.parts[0].text;
        res.json({ resposta: texto })
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({ Error: "Erro ao chamar executar IA", error })
    }
}