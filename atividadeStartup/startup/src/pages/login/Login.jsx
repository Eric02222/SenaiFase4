import FormularioLogin from "../../components/formularioLogin/formularioLogin";
import styles from "./Login.module.css";

function Login() {
  return (
    <div className={styles.paginaLogin}>
        <FormularioLogin/>
    </div>
  )
}

export default Login