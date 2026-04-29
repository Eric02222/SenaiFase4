import { useState } from "react"
import {useNavigate} from "react-router"
import { login } from "../../services/login"

function LoginForm() {
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
      
      if(res.length === 0 ){
        return alert("Usuario não encontrado")
      }

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
    <div>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="emailLogin">Email</label>
          <input type="email" id="emailLogin" value={email} onChange={handleEmailChange} required/>
        </div>

        <div>
          <label htmlFor="senhaLogin">Senha</label>
          <input type="password" id="senhaLogin" value={senha} onChange={handlepasswordChange} required/>
        </div>

        <div>
          <a onClick={esqueciSenha} role="button" style={{ cursor: 'pointer' }}>Esqueceu sua Senha?</a>
        </div>

        <div>
          <button type="submit">Entrar Usuario</button>
        </div>
      </form>
    </div>
  )
}

export default LoginForm