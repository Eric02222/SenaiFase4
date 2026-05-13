import { useState } from "react"
import { createUser } from "../../service/usuario.js";

function FormUsuario() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [cpf, setCpf] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [senhasConferes, setSenhasConferes] = useState(true)

    const handleNomeChange = (e) => setNome(e.target.value)
    const handleEmailChange = (e) => setEmail(e.target.value)
    const handleCpfChange = (e) => setCpf(e.target.value)
    const handleSenhaChange = (e) => setSenha(e.target.value)
    const handleConfirmarChange = (e) => setConfirmarSenha(e.target.value)


    const resetForm = () => {
        setNome('')
        setEmail('')
        setSenha('')
        setCpf('')
        setConfirmarSenha('')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (senha !== confirmarSenha) {
            setSenhasConferes(false)
            return
        }

        try {
            const data = {
                nome: nome,
                email: email,
                senha: senha,
                cpf: cpf
            }

            await createUser(data)

            resetForm()

            alert("Usuario criado com sucesso")
        } catch (error) {
            console.log('Erro ao criar usuario:', error);
            alert('Erro ao criar usuairo')
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h1>Cadastro</h1>

                <div>
                    <label htmlFor="nomeUsuario">Nome:</label>
                    <input type="text" id='nomeUsuario' placeholder='Nome Usuario' value={nome} onChange={handleNomeChange} required />
                </div>

                <div>
                    <label htmlFor="emailUsuario">Email:</label>
                    <input type="email" id='emailUsuario' placeholder='email@gmail.com' value={email} onChange={handleEmailChange} required />
                </div>

                <div>
                    <label htmlFor="emailUsuario">CPF:</label>
                    <input type="text" id='emailUsuario' value={cpf} onChange={handleCpfChange} required />
                </div>

                <div>
                    <label htmlFor="senhaUsuario">Senha:</label>
                    <input type="password" id='senhaUsuario' placeholder='********' value={senha} onChange={handleSenhaChange} required />
                </div>

                <div>
                    <label htmlFor="ConfirmarSenhaUsuario">Confirmar Senha:</label>
                    <input type="password" id='ConfirmarSenhaUsuario' placeholder='********' value={confirmarSenha} onChange={handleConfirmarChange} required />

                    {!senhasConferes && (
                        <p>Senhas não correspondem</p>
                    )}
                </div>

                <button type='submit'>Criar Usuario</button>
            </form>

        </div>
    )
}

export default FormUsuario