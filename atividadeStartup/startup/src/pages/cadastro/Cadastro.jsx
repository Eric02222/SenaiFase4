import FormularioRegistro from "../../components/formularioRegistro/FormularioRegistro"
import styles from "./Cadastro.module.css";

function Cadastro() {
  return (
    <div className={styles.paginaCadastro}>
        <FormularioRegistro/>
    </div>
  )
}

export default Cadastro