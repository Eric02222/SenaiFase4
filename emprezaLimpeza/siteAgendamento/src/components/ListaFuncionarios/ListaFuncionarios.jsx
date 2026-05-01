import { useEffect, useState } from "react"
import { getFuncionario } from "../../services/funcionario.js"
import Modal from "../Modal/Modal.jsx";
import FazerAgendamento from "../FazerAgendamento/FazerAgendamento.jsx"
import { postAgendamento } from "../../services/agenda.js";
import { getClienteByEmail } from "../../services/cliente.js";
import { useAuth } from "../../context/context.jsx"

function ListaFuncionarios() {
  const [funcionarios, setFuncionarios] = useState([])
  const [modal, setModal] = useState(false);
  const [funcionarioSelecionado, setFuncionarioSelecionado] = useState(null)

  const [dataAgendamento, setDataAgendamento] = useState("")
  const [endereco, setEndereco] = useState("")

  const { user } = useAuth()

  const carregarFuncionarios = async () => {
    try {
      const lista = await getFuncionario()
      console.log(lista.data)
      setFuncionarios(lista)
    } catch (error) {
      console.log('Error ao carregar funcionarios', error)
      setFuncionarios([])
    }
  }

  useEffect(() => {
    carregarFuncionarios()
  }, [])

  const abrirModalAgendamento = (funcionario) => {
    setFuncionarioSelecionado(funcionario)
    console.log(funcionario.id_funcionario)
    console.log(user.usuario.email)

    setModal(true);
  }

  const fecharModal = () => {
    setModal(false);
    setFuncionarioSelecionado(null);

  };

  const salvar = async (e) => {
    e.preventDefault()
    try {
      const res = await getClienteByEmail(user.usuario.email);
      if (res.length === 0) {
        return alert("Usuario não encontrado")
      }
      
      const data = {
        endereco: endereco,
        data_servico: dataAgendamento,
        cliente_id: res.id_cliente,
        funcionario_id: funcionarioSelecionado.id_funcionario
      };


      const ok = await postAgendamento(data);

      if (ok === "") {
        alert("Não foi possivel fazer agendamento!");
        return false;
      }

      alert("Agendamento feito com sucesso!");
      fecharModal();

    } catch (error) {

    }
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Nome:</th>
            <th>Email:</th>
            <th>Endereço:</th>
            <th>Numero telefone:</th>
          </tr>
        </thead>

        <tbody>
          {funcionarios && funcionarios.map((f) => (
            <tr key={f.id_funcionario}>
              <td>{f.nome}</td>
              <td>{f.email}</td>
              <td>{f.endereco}</td>
              <td>{f.numero_telefone}</td>
              <td>
                <button onClick={() => abrirModalAgendamento(f)}>Agendar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal open={modal} onClose={fecharModal} onSave={salvar} title={"Fazer Agendamento"}>
        <FazerAgendamento dataAgendamento={dataAgendamento} endereco={endereco} onChangeAgendamento={setDataAgendamento} onChangeEndereco={setEndereco} />
      </Modal>
    </div>
  )
}

export default ListaFuncionarios