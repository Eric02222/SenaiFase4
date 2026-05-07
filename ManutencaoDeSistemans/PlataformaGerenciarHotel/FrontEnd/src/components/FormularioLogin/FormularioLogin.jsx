import { useState } from "react"
import { useNavigate } from "react-router"
import { useAuth } from '../../context/Context';
import { loginUser } from "../../service/login.js"

function FormularioLogin() {
  const { login } = useAuth()
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const navigate = useNavigate();

  const handleEmailChange = (e) => setEmail(e.target.value)
  const handleSenhaChange = (e) => setSenha(e.target.value)

  const resetForm = () => {
    setEmail('')
    setSenha('')
  }

  const esqueciSenha = () => {
    navigate('/esquciSenha')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const data = {
        email: email,
        senha: senha
      }

      const res = await loginUser(data)
      console.log(res)
      if (res.length === 0) {
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
    catch (error) {
      console.error("Erro ao logar usuario", error)
      alert('Erro ao logar usuario')
    }
  }


  return (
    <div className='container'>
      <h2 >Acesso ao Sistema</h2>
      <form onSubmit={handleSubmit} >

        <div className="form-group mb-3">
          <label htmlFor="emailRegistro" className='form-label'>Email</label>
          <input type="email" id='emailRegistro' className="form-control" value={email} onChange={handleEmailChange} required />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="senhaRegistro" className='form-label'>Senha</label>
          <input type="password" id='senhaRegistro' className="form-control" value={senha} onChange={handleSenhaChange} placeholder='********' required />
        </div>

        <div className="d-flex justify-content-center mb-4">
          <a onClick={esqueciSenha} className="text-decoration-none text-primary small fw-bold" role="button" style={{ cursor: 'pointer' }}>Esqueci minha senha</a>

        </div>

        <div className="d-flex justify-content-center ">
          <button type='submit' className="btn btn-primary fw-bold" >
            Entrar Usuário
          </button>
        </div>


      </form>

    </div>
  )
}

export default FormularioLogin