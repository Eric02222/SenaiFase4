import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/Context"; 
import FormularioLogin from "../../components/formularioLogin/formularioLogin";
import styles from "./Login.module.css";

function Login() {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [user, navigate]);

  return (
    <div className={styles.paginaLogin}>
      <FormularioLogin />
    </div>
  );
}

export default Login;
