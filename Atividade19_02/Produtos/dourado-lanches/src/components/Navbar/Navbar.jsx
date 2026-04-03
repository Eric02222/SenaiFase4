import { useAuth } from "../../context/Context";
import { Link } from "react-router";


const Navbar = () => {
    const { user, logout } = useAuth();
    return (
        <nav className="navbar navbar-expand navbar-dark bg-primary shadow-sm px-4 py-2">
            <div className="container-fluid">
                <h1 className="navbar-brand mb-0 fs-3 fw-bold">Dourando lanches</h1>

                <div className="d-flex align-items-end gap-3"> 
                    <Link className="btn btn-outline-light px-3" to="/home">Home</Link>
                    <Link className="btn btn-outline-light px-3" to="/produtos">Produtos</Link>
                    <Link className="btn btn-outline-light px-3" to="/usuario">Usuarios</Link>
                </div>


                {user ? (
                    <nav className="d-flex align-items-center gap-3">
                        <span className="text-white fw-medium">{user.usuario.email}</span>

                        <button onClick={logout} className="btn btn-danger btn-sm px-3 shadow-sm fw-bold" >
                            Sair
                        </button>
                    </nav>
                ) : (
                    <nav className="d-flex gap-2">
                        <Link to="/" className="btn btn-outline-light px-3">
                            Login
                        </Link>

                        <Link to="/cadastro" className="btn btn-light px-3 fw-medium text-primary shadow-sm" >
                            Cadastro
                        </Link>
                    </nav>
                )}
            </div>

        </nav>
    )
}

export default Navbar;