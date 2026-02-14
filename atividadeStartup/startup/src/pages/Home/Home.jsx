import { useEffect, useState } from "react";
import { useAuth } from "../../context/Context";
import { useNavigate } from "react-router";
import Modal from "../../components/modal/Modal";
import FormularioVeiculos from "../../components/formularioVeiculos/FormularioVeiculos";

function Home() {
  const [veiculos, setVeiculos] = useState([]);
  const { user } = useAuth();
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
    const id = user.id_usuario;
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
    getVeiculos();
  }, [user]);

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

  const reservarVeiculo(veiculo) =>{
    if (veiculo.status_bateria < 30){
      alert("Veiculo não pode ser reservado, Bateria abaixo de 30%")
    }else {
      alert("Veiculo reservado com sucesso")
    }
  }

  return (
    <div>
      <h2>Monitoramento de Veiculos</h2>

      <div>
        <div>
          <button onClick={abrirModalAdicionar}>Adicionar Veiculo</button>
        </div>

        <div>
          <h2>Veiculos Cadastrados</h2>

          <table>
            <thead>
              <tr>
                <td>Id</td>
                <td>Nome</td>
                <td>Modelo</td>
                <td>Ano</td>
                <td>Marca</td>
                <td>Status Bateria</td>
                <td>Ativo</td>
                <td>Usuario </td>
                <td>DataHora Cadastro</td>
                <td>DataHora Atualização</td>
              </tr>
            </thead>

            <tbody>
              {veiculos.map((veiculo) => (
                <tr key={veiculo.id_veiculo || veiculo.id}>
                  <td>{veiculo.id_veiculo || veiculo.id}</td>
                  <td>{veiculo.nome}</td>
                  <td>{veiculo.modelo}</td>
                  <td>{veiculo.ano}</td>
                  <td>{veiculo.marca}</td>
                  <td>{veiculo.status_bateria}</td>
                  <td>{veiculo.ativo === 1 ? "Sim" : "Não"}</td>
                  <td>{veiculo.dataHora_cadastro}</td>

                  <td>
                    <button onClick={() => abrirModalEditar(veiculo)}>Editar</button>
                    <button onClick={() => abrirModalDeletar(veiculo)}>Excluir</button>

                    <button onClick={}>Reservar Veiculo</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {veiculos.length === 0 && <p>Nenhum veículo cadastrado.</p>}
        </div>
      </div>

      {/* Modal de CADASTRO */}
      <Modal isOpen={modalFormAberto} onClose={() => setModalCadastroAberto(false)}>
        <FormularioVeiculos veiculoParaEditar={veiculoSelecionado} onSuccess={getVeiculos} onClose={() => setModalFormAberto(false)} />
      </Modal>

      {/* Modal de EXCLUSÃO */}
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
