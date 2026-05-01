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
    <div className='container'>

      <form onSubmit={handleSubmit}>
        <h2>Criar Conta</h2>

        <div className="form-group mb-3">
          <label htmlFor="nomeCadastro" className='form-label'>Nome</label>
          <input type="text" className="form-control" id='nomeCadastro' value={nome} onChange={handleNomeChange} required />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="emailCadastro" className='form-label'>Email</label>
          <input type="email" className="form-control" id='emailCadastro' value={email} onChange={handleEmailChange} required />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="cpfCadastro" className='form-label'>CPF</label>
          <input type="text" className="form-control" id='cpfCadastro' value={cpf} onChange={handleCpfChange} maxLength="11" required />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="enderecoCadastro" className='form-label'>Endereço</label>
          <input type="text" className="form-control" id='enderecoCadastro' value={endereco} onChange={handleEnderecoChange} required />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="telefoneCadastro" className='form-label'>Numero Telefone</label>
          <input type="text" className="form-control" id='telefoneCadastro' value={telefone} onChange={handleTelefoneChange} required />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="senhaCadastro" className='form-label'>Senha</label>
          <input type="password" className="form-control" id='senhaCadastro' value={senha} onChange={handlesenhaChange} required />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="confirmarSenhaCadastro" className='form-label'>Confirmar Senha</label>
          <input type="password" className="form-control" id='confirmarSenhaCadastro' value={confirmarSenha} onChange={handleConfirmarSenhaChange} required />
        </div>

        <div className="d-flex justify-content-center ">
          <button type='submit' className="btn btn-primary fw-bold">Criar Conta</button>
        </div>

      </form>
    </div>
  )
}

export default CadastroForm