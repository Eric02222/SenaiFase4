import { Link } from "react-router";
import { useAuth } from "../../context/Context";

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar navbar-expand navbar-dark px-4 py-2" >
      <div className="container-fluid">
        <h1 className="navbar mb-0 fs-3 fw-bold">Hotel Daora</h1>

        <div className="d-flex align-items-end gap-3">
          <Link to="listaQuartos" className="btn btn-outline px-3">Quartos</Link>
          <Link to="reservas" className="btn btn-outline px-3">Reservas</Link>
          <Link to="historicoReservas" className="btn btn-outline px-3">Historico Reservas</Link>
          <Link to="/cadastro" className="btn btn-outline px-3">Cadastro Clientes</Link>

        </div>

        {user ? (
          <nav className="d-flex align-items-center gap-3">
            <button onClick={logout} className="btn btn-danger btn-sm px-3 shadow-sm fw-bold">Logout</button>
          </nav>
        ) : (
          <nav className="d-flex gap-2">
            <Link to="/" className="btn btn-outline px-3">Login</Link>
            <Link to="/cadastro" className="btn btn-light px-3 fw-medium text-primary shadow-sm">Cadastro</Link>
          </nav>
        )}
      </div>
    </nav>
  )
}

export default Navbar