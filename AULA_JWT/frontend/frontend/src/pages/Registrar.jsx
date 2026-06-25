import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


const Registrar = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const [mensagemErro, setMensagemErro] = useState('');

    const navigate = useNavigate();

    const handleRegistrar = async () => {
        try {
            const { data } = await axios.post("http://localhost:8081/auth/registrar", { email, senha },
                { withCredencials: true }
            )

            //as informações permanece com as informações mesmo depois que a aba fecha
            localStorage.setItem("accessToken", data.accessToken);

            //se der certo vou redirecionar para a tela de perfil
            navigate('/login')

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

            <button onClick={handleRegistrar}>Cadastrar</button>

            <br />

            {/* se tiver error aparece aqui */}
            {mensagemErro && <p style={{ color: "#f00" }}>{mensagemErro}</p>}

            <br />


            <span>Já possui uma conta? <Link to="/login">Entrar na sua conta</Link></span>
        </>
    )
}

export default Registrar;