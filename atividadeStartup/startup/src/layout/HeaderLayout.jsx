import { Link, Outlet } from "react-router"
import { useAuth } from "../context/Context"

function HeaderLayout() {
    const { user, logout } = useAuth()

    return (
        <div>
            <main >
                <header >
                    <h1>Controle Entregas</h1>
                    {user ? (
                        <div >
                            <Link to="/home">
                                <label >Home</label>
                            </Link>

                            <Link to="/historico">
                                <label >Historico Entregas</label>
                            </Link>
                            <span>{user.email}</span>
                            <button onClick={logout}>Sair</button>
                        </div>
                    ) : (
                        <div>
                            <Link to="/">
                                <label >Login</label>
                            </Link>

                            <Link to="/cadastro">
                                <label >Cadastro</label>
                            </Link>
                        </div>

                    )}

                </header>
                <section>
                    <Outlet />

                </section>
            </main>
        </div>
    )
}

export default HeaderLayout