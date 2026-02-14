import axios from "axios";

function ConfirmacaoDelecao({ veiculo, onClose, onSucesso }) {
  const handleDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:3000/veiculos/${veiculo.id}`,
      );

      alert("Veículo excluído com sucesso!");
      onSucesso();
      onClose(); 
    } catch (e) {
      console.e("Erro ao deletar:", e);
      alert("Erro ao excluir o veículo.");
    } 
  };

  return (
    <div>
      <h3>Confirmar Exclusão</h3>
      <p>
        Tem certeza que deseja excluir o veículo: <strong>{veiculo?.nome}</strong>?
      </p>
      <p>
        Essa ação não pode ser desfeita.
      </p>

      <div>
        <button onClick={handleDelete}>
          Sim, Excluir
        </button>
        <button onClick={onClose}>
          Cancelar
        </button>
      </div>
    </div>
  );
}

export default ConfirmacaoDelecao;
