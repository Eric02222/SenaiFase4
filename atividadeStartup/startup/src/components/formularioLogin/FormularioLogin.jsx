import { useState } from "react"
import axios from 'axios'
import { useNavigate } from "react-router"
import { useAuth } from "../../context/Context"
import styles from "./FormularioLogin.module.css";

function FormularioLogin() {
    const {login} = useAuth()
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
             const res = await axios.post('http://localhost:3000/auth/login', data)

            if (res.data.length === 0) {
                return alert('Usuario não encontrado')
            }
            
            const dataUsuario = {
                ...res
            }

            resetForm()
            login(dataUsuario)
            alert("login efetuado com sucesso");
            navigate('/home')
        } catch (error) {
            console.error("Erro ao criar usuario", error)
            alert('Erro ao criar usuario')
        }
    }

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmitLogin} className={styles.card}>
                <h2 className={styles.titulo}>Acesso ao Sistema</h2>

                <div className={styles.inputGroup}>
                    <label htmlFor="emailLogin" className={styles.label}>Email</label>
                    <input type="email" id='emailLogin' value={email} onChange={handleEmailChange} required className={styles.input}/>
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="senhaLogin" className={styles.label}>Senha</label>
                    <input type="password" id='senhaLogin' value={senha} onChange={handleSenhaChange} required className={styles.input}/>
                    
                </div>

                <div>
                    <button type='submit' className={styles.btnPrincipal}>
                        Entrar Usuário
                    </button>
                </div>
            </form>

        </div>
    )
}

export default FormularioLogin