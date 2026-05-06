import { Link } from "react-router";
import { useAuth } from "../../context/Context"

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav>
      <div>
        <h1>Hotel Daora</h1>

        {user.usuario.admin === true ? (
          <nav>
            <Link to="listaQuartos">Quartos</Link>
            <Link to="reservas">Reservas</Link>
            <Link to="historicoReservas">Historico Reservas</Link>
            <Link to="/cadastro">Cadastro</Link>

          </nav>
        ) : (
          <Link to="reservas">Reservas</Link>
        )}


        {user ? (
          <nav>
            <button onClick={logout()}>Logout</button>
          </nav>
        ) : (
          <nav>
            <Link to="/">Login</Link>
            <Link to="/cadastro">Cadastro</Link>
          </nav>
        )}
      </div>
    </nav>
  )
}

export default Navbar