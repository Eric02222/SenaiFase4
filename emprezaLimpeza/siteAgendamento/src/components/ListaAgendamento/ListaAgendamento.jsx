import { useEffect, useState } from "react"
import { useAuth } from "../../context/context.jsx"
import { getClienteByEmail } from "../../services/cliente.js";
import { exclusaoAgenda, getAgendamentoByClientId } from "../../services/agenda.js";


function ListaAgendamento() {
  const [agendamentos, setAgendamentos] = useState([])
  const {user} = useAuth()

  const carregarAgendamentos = async () => {
    try {
      const res = await getClienteByEmail(user.usuario.email);
      if (res.length === 0) {
        return alert("Usuario não encontrado")
      }

      const lista = await getAgendamentoByClientId(res.id_cliente)

      console.log(lista.data)
      setAgendamentos(lista)
    } catch (error) {
      console.log('Error ao carregar funcionarios', error)
      setAgendamentos([])
    }
  }

  useEffect(() => {
    carregarAgendamentos()
  }, [])

  const remover = async (id) => {
        try {
            const excluido = await exclusaoAgenda(id.id_agendamento);

            alert("Excluiu a agendamento, Parabens")
            await carregarProdutos();
        } catch (error) {
            console.log("Erro:", error);

        }
    }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>endereco:</th>
            <th>Data do Servico:</th>
            <th>Data Criado:</th>
            <th>Funcionario:</th>
          </tr>
        </thead>

        <tbody>
          {agendamentos && agendamentos.map((a) => (
            <tr key={a.id_agendamento}>
              <td>{a.endereco}</td>
              <td>{a.data_servico}</td>
              <td>{a.data_criado}</td>
              <td>
                <button onClick={() => remover(a)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  )
}

export default ListaAgendamento