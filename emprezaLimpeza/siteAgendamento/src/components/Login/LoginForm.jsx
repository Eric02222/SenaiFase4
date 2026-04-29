import { useState } from "react"
import { useNavigate } from "react-router"
import { login } from "../../services/login"
import { useAuth } from "../../context/context"

function LoginForm() {
  const { login } = useAuth()
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")

  const navigate = useNavigate()

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlepasswordChange = (e) => setSenha(e.target.value)

  const resetForm = () => {
    setEmail("")
    setSenha("")
  }


  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const data = {
        email: email,
        senha: senha
      }
      const res = await login(data);
      console.log(res)

      if (res.length === 0) {
        return alert("Usuario não encontrado")
      }

      const dataUsuario = {
        ...res
      }

      login(dataUsuario)

      resetForm()
      alert("Login efetuado com sucesso")
      navigate("/home")
    } catch (error) {
      console.log("Erro ao logar usuario", error)
      alert("Erro ao logar Usuario")
    }
  }

  function esqueciSenha() {
    navigate("/esqueciSenha")
  }

  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="form-group mb-3">
          <label htmlFor="emailLogin">Email</label>
          <input type="email" className="form-control" id="emailLogin" value={email} onChange={handleEmailChange} required />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="senhaLogin">Senha</label>
          <input type="password" className="form-control" id="senhaLogin" value={senha} onChange={handlepasswordChange} required />
        </div>

        <div className="d-flex justify-content-center mb-4">
          <a onClick={esqueciSenha} className="text-decoration-none text-primary small fw-bold" role="button" style={{ cursor: 'pointer' }}>Esqueceu sua Senha?</a>
        </div>

        <div className="d-flex justify-content-center ">
          <button type="submit" className="btn btn-primary fw-bold">Entrar Usuario</button>
        </div>
      </form>
    </div>
  )
}

export default LoginForm