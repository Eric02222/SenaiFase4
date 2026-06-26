import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import clienthttp from "../service/api.js";
 

const Perfil = () => {
    const [dadosUsuario, setDadosUsuario] = useState()
    const [segundosAteExpirar, setSegundosAteExpirar] = useState(0)
    const navigate = useNavigate()

    function calcularSegundosAteExpiracao(token){
        try {
            const payloadBase64 = token.split('.')[1];
            const payloadDecodificado = JSON.parse(atob(payloadBase64));
            const agora = Math.floor(Date.now() / 1000)

            return Math.max(0, payloadDecodificado.exp - agora)
        } catch (error) {
            console.info("Deu erro: ", error)
        }
    }

    useEffect(() => {
        const tokenAtual = localStorage.getItem("accessToken")

        setSegundosAteExpirar(calcularSegundosAteExpiracao(tokenAtual))

        clienthttp.get('api/perfil', {
            headers: {Authorization: `Bearer ${tokenAtual}`} 
        }).then(({data}) => setDadosUsuario(data.usuario))
        .catch(() => navigate('/'))
    }, [])

    useEffect(() => {
        //Decrementa 1 segundo a cada tick do interval
        const temporizador = setInterval(() => {
            setSegundosAteExpirar(segundosAnteriores => Math.max(0, segundosAnteriores - 1))
        }, 1000)

        //Função de limpeza: cancela o intervalo quando o componente for desmontado
        return () => clearInterval(temporizador)
    }, [])

    async function handleLogout() {
        await clienthttp.post('/auth/logout')
        localStorage.removeItem('accessToken')
        navigate('/')
    }

    const corContador = segundosAteExpirar > 5 ? "green" : segundosAteExpirar > 0 ? "orange" : "red"

    return (
        <>
            <h1>Perfil</h1> <Link to="/chat">Chat com IA</Link>

            {
                dadosUsuario ? <p>Logado como: <strong>{dadosUsuario.email}</strong></p> : <p>Expirado...</p>
            }

            <small>acces Token expira em:</small>
            <div style={{ fontSize: "2rem", fontWeight: "bold", color: corContador}}>
                {segundosAteExpirar > 0 ? `${segundosAteExpirar}s` : "Expirado!"}
            </div>

            <button onClick={handleLogout}>Sair</button>
        </>
    )
}

export default Perfil;