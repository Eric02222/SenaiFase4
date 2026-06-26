import React, { useState } from 'react'
import clienthttp from '../service/api';

function Chat() {
    const [mensagem, setMensagem] = useState("");
    const [resposta, setResposta] = useState("");
    const [carregando, setCarregando] = useState(false);

    async function enviar() {
        setCarregando(true)

        try {
            const r = await clienthttp.post('/api/ia', { mensagem })

            setResposta(r.data.resposta)
        } catch (error) {
            setResposta("Erro ao consultar a IA")

        }
        setCarregando(false)
    }

    return (
        <>
            <div style={{ maxWidth: 900, margin: "40px auto" }}>
                <h2>Chat com IA (Google Gemini)</h2>

                <textarea rows={8} style={{ width: "100%" }} value={mensagem} onChange={(e) => setMensagem(e.target.value)} placeholder='Digite sua pergunta...' />

                <br />

                <button onClick={enviar} disabled={carregando}>{carregando ? "Consultando" : "Perguntar a IA"}</button>

                <hr />

                <h2>Resposta</h2>
                <br />
                <p>{resposta}</p>
            </div>
        </>
    )
}

export default Chat