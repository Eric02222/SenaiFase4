import styles from "./Modal.module.css";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.fundoEscuro}>
      <div className={styles.caixaModal}>
        <button className={styles.botaoFechar} onClick={onClose}>
          X
        </button>

        {children}
      </div>
    </div>
  );
};

export default Modal;
