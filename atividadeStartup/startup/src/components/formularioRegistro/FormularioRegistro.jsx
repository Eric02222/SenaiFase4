import { useState } from "react"
import axios from 'axios'
import { useNavigate } from "react-router"

function FormularioRegistro() {
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [senhaConfirmar, setSenhaConfirmar] = useState('')

    const [senhasConferes, setSenhasConferes] = useState(true)
    const navigate = useNavigate();

    const handleNomeChange = (e) => setNome(e.target.value)
    const handleEmailChange = (e) => setEmail(e.target.value)
    const handleSenhaChange = (e) => setSenha(e.target.value)
    const handlesenhaConfirmar = (e) => setSenhaConfirmar(e.target.value)

    const senhaValida = () => password.length >= 8 && senha === senhaConfirmar

    const resetForm = () => {
        setNome('')
        setEmail('')
        setSenha('')
        setSenhaConfirmar('')
        setSenhasConferes(true)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!senhaValida()) {
            setSenhasConferes(false)
            return
        }

        try {
            const data = {
                nome: nome,
                email: email,
                senha: senha
            }

            await axios.post(' colocar depois registro', data)

            resetForm()

            alert('Conta criada com sucesso!')
            navigate('/login')
           

        }
        catch (error) {
            console.log('Erro ao de conexão:', error);
            alert('Erro ao conectar ao servidor')
        }
    }

    return (
        <div>
            <form action={handleSubmit}>
                <h2>Criar Usuários</h2>
                <div>
                    <label htmlFor="nomeRegistro">Nome</label>
                    <input type="text" id='nomeRegistro' value={nome} onChange={handleNomeChange} />
                </div>
                <div>
                    <label htmlFor="emailRegistro">Email</label>
                    <input type="text" id='emailRegistro' value={email} onChange={handleEmailChange} />
                </div>
                <div>
                    <label htmlFor="senhaRegistro">Senha</label>
                    <input type="text" id='senhaRegistro' value={senha} onChange={handleSenhaChange} />
                </div>

                <div>
                    <label htmlFor="confirmarSenhaRegistro">Confirmar Senha</label>
                    <input type="text" id='confirmarSenhaRegistro' value={senhaConfirmar} onChange={handlesenhaConfirmar} />

                    {!senhasConferes && (
                        <p >Senhas não correspodem</p>
                    )}
                </div>

                <div >
                    <button type='submit'>
                        Criar Usuário
                    </button>
                </div>
            </form>

        </div>
    )
}

export default FormularioRegistro