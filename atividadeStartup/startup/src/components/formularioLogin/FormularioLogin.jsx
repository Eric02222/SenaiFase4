import { useState } from "react"
import axios from 'axios'
import { useNavigate } from "react-router"
import { useAuth } from "../../context/Context"


function FormularioLogin() {
    const {login} = useAuth
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

    const navigate = useNavigate();

    const handleEmailChange = (e) => setEmail(e.target.value)
    const handleSenhaChange = (e) => setSenha(e.target.value)

    const resetForm = () => {
        setEmail('')
        setSenha('')
    }

    const handleSubmitLogin = async (e) => {
        e.preventDefault()

        try {

            const data = {
                email: email,
                senha: senha
            }
             const res = await axios.post('colocar depois login', data)

            if (res.data.length === 0) {
                return alert('Usuario não encontrado')
            }
            
            const dataUsuario = {
                ...res
            }

            resetForm()
            login(dataUsuario)
            alert("login efetuado com sucesso");
            navigate('/main')
        } catch (error) {
            console.error("Erro ao criar usuario", error)
            alert('Erro ao criar usuario')
        }
    }

    return (
        <div>
            <form action={handleSubmitLogin}>
                <h2>Criar Usuários</h2>
                <div>
                    <label htmlFor="emailLogin">Email</label>
                    <input type="text" id='emailLogin' value={email} onChange={handleEmailChange}/>
                </div>

                <div>
                    <label htmlFor="senhaLogin">Senha</label>
                    <input type="text" id='senhaLogin' value={senha} onChange={handleSenhaChange} />
                    
                </div>

                <div>
                    <button type='submit'>
                        Entrar Usuário
                    </button>
                </div>
            </form>

        </div>
    )
}

export default FormularioLogin