import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { criarCliente } from '../../services/cliente.js'

function CadastroForm() {
  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [confirmarSenha, setConfirmarSenha] = useState("")
  const [cpf, setCpf] = useState("")
  const [endereco, setEndereco] = useState("")
  const [telefone, settTelefone] = useState("")

  const navigate = useNavigate()

  const handleNomeChange = (e) => setNome(e.target.value)
  const handleEmailChange = (e) => setEmail(e.target.value)
  const handleCpfChange = (e) => setCpf(e.target.value)
  const handleEnderecoChange = (e) => setEndereco(e.target.value)
  const handleTelefoneChange = (e) => settTelefone(e.target.value)
  const handlesenhaChange = (e) => setSenha(e.target.value)
  const handleConfirmarSenhaChange = (e) => setConfirmarSenha(e.target.value)

  const senhaValida = () => senha.length >= 8 && senha === confirmarSenha

  const resetForm = () => {
    setNome("")
    setEmail("")
    setCpf("")
    setEndereco("")
    settTelefone("")
    setSenha("")
    setConfirmarSenha("")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!senhaValida) {
      return alert("Senhas não conferem")
    }

    try {
      const data = {
        nome: nome,
        email: email,
        senha: senha,
        cpf: cpf,
        endereco: endereco,
        numero_telefone: telefone
      }

      await criarCliente(data)

      resetForm()
      alert("Conta criada com sucesso")
      navigate("/")

    } catch (error) {
      console.log("Erro ao criar usuario", error)
      alert("Erro ao Criar conta")
    }
  }

  return (
    <div>
      <h2>Criar Conta</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nomeCadastro">Nome</label>
          <input type="text" id='nomeCadastro' value={nome} onChange={handleNomeChange} required/>
        </div>

        <div>
          <label htmlFor="emailCadastro">Email</label>
          <input type="email" id='emailCadastro' value={email} onChange={handleEmailChange} required/>
        </div>

        <div>
          <label htmlFor="cpfCadastro">Cpf</label>
          <input type="text" id='cpfCadastro' value={cpf} onChange={handleCpfChange} maxLength="11" required/>
        </div>

        <div>
          <label htmlFor="enderecoCadastro">Endereço</label>
          <input type="text" id='enderecoCadastro' value={endereco} onChange={handleEnderecoChange} required/>
        </div>

        <div>
          <label htmlFor="telefoneCadastro">Numero Telefone</label>
          <input type="text" id='telefoneCadastro' value={telefone} onChange={handleTelefoneChange} required/>
        </div>

        <div>
          <label htmlFor="senhaCadastro">Senha</label>
          <input type="password" id='senhaCadastro' value={senha} onChange={handlesenhaChange} required />
        </div>

        <div>
          <label htmlFor="confirmarSenhaCadastro">Confirmar Senha</label>
          <input type="password" id='confirmarSenhaCadastro' value={confirmarSenha} onChange={handleConfirmarSenhaChange} required/>
        </div>

        <div>
          <button type='submit'>Criar Conta</button>
        </div>

      </form>
    </div>
  )
}

export default CadastroForm