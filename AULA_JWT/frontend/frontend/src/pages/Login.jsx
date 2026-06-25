import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const [mensagemErro, setMensagemErro] = useState('');

    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const { data } = await axios.post("http://localhost:8081/auth/login", { email, senha },
                { withCredentials: true }
            )

            //as informações permanece com as informações mesmo depois que a aba fecha
            localStorage.setItem("accessToken", data.accessToken);
            //se der certo vou redirecionar para a tela de perfil
            navigate('/perfil')

            //as informações se perdem quando é fechado a aba ativa do sessionStorage
        } catch (error) {
            setMensagemErro("Credencias inválidas")
        }
    }

    return (
        <>
            <input type="email" placeholder="E-mail" value={email}
                onChange={e => setEmail(e.target.value)} />
            <br />
            <input type="password" placeholder="Password" value={senha}
                onChange={e => setSenha(e.target.value)} />

            <br />

            <button onClick={handleLogin}>Entrar</button>

            <br />

            {/* se tiver error aparece aqui */}
            {mensagemErro && <p style={{ color: "#f00" }}>{mensagemErro}</p>}

            <br />


            <span>Não tem conta? <Link to="/registrar">Crie sua conta</Link></span>
        </>
    )
}

export default Login;