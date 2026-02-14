import { useState } from "react"
import axios from 'axios'
import { useNavigate } from "react-router"
import styles from "./FormularioRegistro.module.css";

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

    const senhaValida = () => senha.length >= 8 && senha === senhaConfirmar

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

            await axios.post('http://localhost:3000/auth/register', data)

            resetForm()

            alert('Conta criada com sucesso!')
            navigate('/')
           

        }
        catch (error) {
            console.log('Erro ao de conexão:', error);
            alert('Erro ao conectar ao servidor')
        }
    }

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit} className={styles.card}>
                <h2 className={styles.titulo}>Criar Usuários</h2>

                <div className={styles.inputGroup}> 
                    <label htmlFor="nomeRegistro">Nome</label>
                    <input type="text" id='nomeRegistro' value={nome} onChange={handleNomeChange} className={styles.input} required />
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="emailRegistro">Email</label>
                    <input type="email" id='emailRegistro' value={email} onChange={handleEmailChange} className={styles.input} required/>
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="senhaRegistro">Senha</label>
                    <input type="password" id='senhaRegistro' value={senha} onChange={handleSenhaChange} className={styles.input} required/>
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="confirmarSenhaRegistro">Confirmar Senha</label>
                    <input type="password" id='confirmarSenhaRegistro' value={senhaConfirmar} onChange={handlesenhaConfirmar} className={styles.input} required />

                    {!senhasConferes && (
                        <p className={styles.erroTexto}>Senhas não correspodem</p>
                    )}
                </div>

                <div >
                    <button type='submit' className={styles.btnPrincipal}>
                        Criar Usuário
                    </button>
                </div>
            </form>

        </div>
    )
}

export default FormularioRegistro