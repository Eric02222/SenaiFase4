import axios from "axios";
import styles from "./ConfirmacaoDelecao.module.css"

function ConfirmacaoDelecao({ veiculo, onClose, onSucesso }) {
  const handleDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:3000/veiculos/${veiculo.id_veiculo}`,
      );

      alert("Veículo excluído com sucesso!");
      onSucesso();
      onClose(); 
    } catch (e) {
      console.log("Erro ao deletar:", e);
      alert("Erro ao excluir o veículo.");
    } 
  };

  return (
    <div className={styles.card}>
      <h3 className={styles.titulo}>Confirmar Exclusão</h3>
      <p className={styles.texto}>
        Tem certeza que deseja excluir o veículo: <strong>{veiculo?.nome}</strong>?
      </p>
      <p className={`${styles.texto} ${styles.aviso}`}>
        Essa ação não pode ser desfeita.
      </p>

      <div className={styles.botoesContainer}>
        <button onClick={handleDelete} className={`${styles.btnBase} ${styles.btnExcluir}`}>
          Sim, Excluir
        </button>
        <button onClick={onClose} className={`${styles.btnBase} ${styles.btnCancelar}`}>
          Cancelar
        </button>
      </div>
    </div>
  );
}

export default ConfirmacaoDelecao;
