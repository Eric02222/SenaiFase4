import { Link, Outlet } from "react-router";
import { useAuth } from "../context/Context";

function HeaderLayout() {
  const { user, logout } = useAuth();

  return (
    <div >
      <header >
        <h1>Sistema teste</h1>
        {user ? (
          <nav>
            <span>{user.usuario.email}</span>

            <button onClick={logout} >
              Sair
            </button>
          </nav>
        ) : (
          <nav>
            <Link to="/" >
              Login
            </Link>

            <Link to="/cadastro" >
              Cadastro
            </Link>
          </nav>
        )}
      </header>

      <section>
        <Outlet />
      </section>
    </div>
  );
}

export default HeaderLayout;
