import { useEffect, useState } from "react";
import { useAuth } from "../../context/Context";
import { useNavigate } from "react-router";
import Modal from "../../components/modal/Modal";
import axios from "axios";
import FormularioVeiculos from "../../components/formularioVeiculos/FormularioVeiculos";
import ConfirmacaoDelecao from "../../components/ConfirmacaoDelecao/ConfirmacaoDelecao";
import styles from "./Home.module.css";

function Home() {
  const [veiculos, setVeiculos] = useState([]);
  const { user } = useAuth();
  const id = user?.data?.usuario?.id_usuario;
  const navigate = useNavigate();

  const [modalFormAberto, setModalFormAberto] = useState(false);
  const [modalDeleteAberto, setModalDeleteAberto] = useState(false);
  const [veiculoSelecionado, setveiculoSelecionado] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  const getVeiculos = async () => {
    if (!id) return;
    try {
      const res = await axios.get(
        `http://localhost:3000/veiculos/usuario/${id}`,
      );
      setVeiculos(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (id) {
      getVeiculos();
    }
  }, [id]);

  const abrirModalAdicionar = () => {
    setveiculoSelecionado(null);
    setModalFormAberto(true);
  };

  const abrirModalEditar = (veiculo) => {
    setveiculoSelecionado(veiculo);
    setModalFormAberto(true);
  };

  const abrirModalDeletar = (veiculo) => {
    setveiculoSelecionado(veiculo);
    setModalDeleteAberto(true);
  };

  const reservarVeiculo = (veiculo) => {
    if (veiculo.status_bateria < 30 || veiculo.ativo === 0) {
      alert("Veículo não pode ser reservado!");
    } else {
      alert("Veículo reservado com sucesso!");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerTop}>
        <h2 className={styles.tituloPrincipal}>Monitoramento de Veiculos</h2>
        <button onClick={abrirModalAdicionar} className={styles.btnAdicionar}>
          Adicionar Veiculo
        </button>
      </div>

      <div className={styles.card}>
        <h2 className={styles.tituloCard}>Veiculos Cadastrados</h2>

        <table className={styles.tabela}>
          <thead>
            <tr>
              <th>Id</th>
              <th>Nome</th>
              <th>Modelo</th>
              <th>Ano</th>
              <th>Marca</th>
              <th>Status Bateria</th>
              <th>Ativo</th>
              <th>Usuario </th>
              <th>DataHora Cadastro</th>
              <th>DataHora Atualização</th>
            </tr>
          </thead>

          <tbody>
            {veiculos.map((veiculo) => (
              <tr key={veiculo.id_veiculo}>
                <td>{veiculo.id_veiculo}</td>
                <td>{veiculo.nome}</td>
                <td>{veiculo.modelo}</td>
                <td>{veiculo.ano}</td>
                <td>{veiculo.marca}</td>
                <td>{veiculo.status_bateria}</td>
                <td>
                  {veiculo.ativo === 1 ? (
                    <span className={styles.statusAtivo}>Sim</span>
                  ) : (
                    <span className={styles.statusInativo}>Não</span>
                  )}
                </td>
                <td>{veiculo.usuario_cadastro}</td>
                <td>{veiculo.dataHora_atualização}</td>

                <td>
                  <div className={styles.acoesContainer}>
                    <button
                      onClick={() => abrirModalEditar(veiculo)}
                      className={`${styles.btnAcao} ${styles.btnEditar}`}
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => abrirModalDeletar(veiculo)}
                      className={`${styles.btnAcao} ${styles.btnExcluir}`}
                    >
                      Excluir
                    </button>

                    <button
                      onClick={() => reservarVeiculo(veiculo)}
                      className={`${styles.btnAcao} ${styles.btnReservar}`}
                    >
                      Reservar Veiculo
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {veiculos.length === 0 && (
          <p className={styles.mensagemVazia}>Nenhum veículo cadastrado.</p>
        )}
      </div>

      <Modal isOpen={modalFormAberto} onClose={() => setModalFormAberto(false)}>
        <FormularioVeiculos
          veiculoParaEditar={veiculoSelecionado}
          onSuccess={getVeiculos}
          onClose={() => setModalFormAberto(false)}
        />
      </Modal>

      <Modal
        isOpen={modalDeleteAberto}
        onClose={() => setModalDeleteAberto(false)}
      >
        <ConfirmacaoDelecao
          veiculo={veiculoSelecionado}
          onClose={() => setModalDeleteAberto(false)}
          onSucesso={getVeiculos}
        />
      </Modal>
    </div>
  );
}

export default Home;
