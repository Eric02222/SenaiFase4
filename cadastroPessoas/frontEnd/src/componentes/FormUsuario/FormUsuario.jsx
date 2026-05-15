import { useEffect, useEffectEvent, useState } from "react"
import { createUser } from "../../service/usuario.js";

function FormUsuario() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    // const [cpf, setCpf] = useState('');
    // const [cnpj, setCnpj] = useState('');
    const [cpf_cnpj, setCpf_cnpj] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [tipoPessoa, setTipoPessoa] = useState(0)
    const [senhasConferes, setSenhasConferes] = useState(true);

    const handleNomeChange = (e) => setNome(e.target.value)
    const handleEmailChange = (e) => setEmail(e.target.value)
    // const handleCpfChange = (e) => setCpf(e.target.value)
    // const handleCnpjChange = (e) => setCnpj(e.target.value)
    const handleCpf_cnpjChange = (e) => setCpf_cnpj(e.target.value)
    const handleSenhaChange = (e) => setSenha(e.target.value)
    const handleConfirmarChange = (e) => setConfirmarSenha(e.target.value)
    const handleTipopessoaChange = (e) => setTipoPessoa(e.target.value)


    const resetForm = () => {
        setNome('')
        setEmail('')
        setSenha('')
        // setCpf('')
        // setCnpj('')
        setCpf_cnpj('')
        setConfirmarSenha('')
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        if (senha !== confirmarSenha) {
            setSenhasConferes(false)
            return
        }

        let data = {}

        if (cpf_cnpj.length === 11) {
            data = {
                nome: nome,
                email: email,
                senha: senha,
                cpf_cnpj: cpf_cnpj
            }
        } else if (cpf_cnpj.length === 14) {
            data = {
                nome: nome,
                email: email,
                senha: senha,
                cpf_cnpj: cpf_cnpj
            }
        }else{
            return alert("Informe um CPF ou CNPJ validos")
        }

        try {

            await createUser(data)

            resetForm()

            alert("Usuario criado com sucesso")
            window.location.reload();
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
                    <label htmlFor="tipoPessoa">Tipo Pessoa:</label>
                    <select name="tipoPessoa" id="tipoPessoa" value={tipoPessoa} onChange={handleTipopessoaChange}>
                        <option value={0}>PF</option>
                        <option value={1}>PJ</option>
                    </select>
                </div>

                {tipoPessoa === 0 ? (
                    <div>
                        <label htmlFor="cpfUsuario">CPF:</label>
                        <input type="text" id='cpfUsuario' value={cpf_cnpj} onChange={handleCpf_cnpjChange} maxLength="11" required />
                    </div>
                ) : (
                    <div>
                        <label htmlFor="cnpjUsuario">CNPJ:</label>
                        <input type="text" id='cnpjUsuario' value={cpf_cnpj} onChange={handleCpf_cnpjChange} maxLength="14" required />
                    </div>
                )}


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