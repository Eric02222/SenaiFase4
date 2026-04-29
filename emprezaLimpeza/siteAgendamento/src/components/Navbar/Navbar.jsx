import { Link } from "react-router"

function Navbar() {
  return (
    <nav>
      <Link to="/">Login</Link>
      <Link to="/cadastro">Cadastro</Link>
      <Link to="/home">Home</Link>
      <Link to="/agendamentos">agenda</Link>
      <Link to="/historico">Historico</Link>

    </nav>
  )
}

export default Navbar