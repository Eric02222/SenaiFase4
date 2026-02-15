import { Link, Outlet } from "react-router";
import { useAuth } from "../context/Context";
import styles from "./HeaderLayout.module.css";

function HeaderLayout() {
  const { user, logout } = useAuth();

  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <h1 className={styles.titulo}>Controle Entregas</h1>
        {user ? (
          <nav className={styles.nav}>
            <Link to="/home" className={styles.link}>
              Home
            </Link>

            <Link to="/historico" className={styles.link}>
              Historico Alterações
            </Link>

            <span className={styles.userInfo}>{user.email}</span>

            <button onClick={logout} className={styles.btnSair}>
              Sair
            </button>
          </nav>
        ) : (
          <nav className={styles.nav}>
            <Link to="/" className={styles.link}>
              Login
            </Link>

            <Link to="/cadastro" className={styles.link}>
              Cadastro
            </Link>
          </nav>
        )}
      </header>

      <section className={styles.conteudo}>
        <Outlet />
      </section>
    </div>
  );
}

export default HeaderLayout;
