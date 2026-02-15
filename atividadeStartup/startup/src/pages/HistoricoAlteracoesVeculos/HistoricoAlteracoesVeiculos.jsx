import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/Context";
import axios from "axios";
import styles from '../HistoricoAlteracoesVeculos/HistoricoAlteracoesVeculos.module.css';

function HistoricoAlteracoesVeculos() {
  const [veiculos, setVeiculos] = useState([]);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  const getVeiculos = async () => {
    try {
      const res = await axios.get("http://localhost:3000/veiculos");
      setVeiculos(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getVeiculos();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.titulo}>Historico De Alterações de Veiculos</h2>

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
              <th>DataHora Exclusao</th>
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
                <td>{veiculo.dataHora_cadastro} </td>
                <td>{veiculo.dataHora_atualização}</td>
                <td>{veiculo.dataHora_exclusao}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {veiculos.length === 0 && (
          <p className={styles.mensagemVazia}>Nenhum veículo encontrado no histórico.</p>
        )}
      </div>
    </div>
  );
}

export default HistoricoAlteracoesVeculos;
