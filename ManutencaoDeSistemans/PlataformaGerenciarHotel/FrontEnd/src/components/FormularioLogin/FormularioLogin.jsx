import { useState } from "react"
import { useNavigate } from "react-router"
import { useAuth } from '../../context/Context';
import { loginUserCliente, loginUserFuncionario } from "../../service/login.js"

function FormularioLogin() {
  const { login } = useAuth()
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [tipoUsuario, setTipoUsuario] = useState("cliente");

  const navigate = useNavigate();

  const handleEmailChange = (e) => setEmail(e.target.value)
  const handleSenhaChange = (e) => setSenha(e.target.value)
  const handleTipoUsuario = (e) => setTipoUsuario(e.target.value)


  const resetForm = () => {
    setEmail('')
    setSenha('')
  }


  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const data = {
        email: email,
        senha: senha
      }

      if (tipoUsuario == "funcionario") {
        const res = await loginUserFuncionario(data)
        console.log("Funcionario")

        console.log(res)
        if (res.length === 0) {
          return alert('Funcionario não encontrado')
        }

        const dataUsuario = {
          ...res
        }

        resetForm()
        login(dataUsuario)
        alert("login efetuado com sucesso");
        navigate('/listaQuartos')

      } else if (tipoUsuario === "cliente") {
        const res = await loginUserCliente(data)
        console.log("Cliente")

        console.log(res)
        if (res.length == 0) {
          return alert('Usuario não encontrado')
        }

        const dataUsuario = {
          ...res
        }

        resetForm()
        login(dataUsuario)
        alert("login efetuado com sucesso");
        navigate('/listaQuartos')
      }


    }
    catch (error) {
      console.error("Erro ao logar usuario", error)
      alert('Erro ao logar usuario')
    }
  }

  return (
    <div className='container w-25 mt-5 '>
      <h2 className="text-center mx-auto">Acesso ao Sistema</h2>
      <form onSubmit={handleSubmit} className="  " >


        <div className="form-group mb-3">
          <label htmlFor="emailRegistro" className='form-label'>Email</label>
          <input type="email" id='emailRegistro' className="form-control" value={email} onChange={handleEmailChange} required />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="senhaRegistro" className='form-label'>Senha</label>
          <input type="password" id='senhaRegistro' className="form-control" value={senha} onChange={handleSenhaChange} placeholder='********' required />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="tipoUsuario" className='form-label'>Tipo de Conta</label>
          <select nome="tipoUsuario" id='tipoUsuario' className='form-select mb-3' value={tipoUsuario} onChange={handleTipoUsuario}>
            <option value={"cliente"}>Cliente</option>
            <option value={"funcionario"}>Administrador</option>
          </select>
        </div>

        <div className="d-flex justify-content-center mt-4">
          <button type='submit' className="btn btn-primary fw-bold" >
            Entrar Usuário
          </button>
        </div>

      </form>

    </div>
  )
}

export default FormularioLogin