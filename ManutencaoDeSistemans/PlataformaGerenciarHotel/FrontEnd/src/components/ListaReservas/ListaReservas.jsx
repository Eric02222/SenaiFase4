import { useEffect, useState } from "react";
import Modal from "../Modal/Modal";
import { deleteReservas, getReservas, putReserva } from "../../service/reserva";

function ListaReservas() {
  const [reservas, setReservas] = useState([]);

  const [modal, setModal] = useState(false);

  const [reservaSelecionado, setReservaSelecionado] = useState(null);

  const [reservaInicioEdit, setReservaInicioEdit] = useState("");
  const [reservaFimEdit, setReservaFimEdit] = useState("");

  const carregarReserva = async () => {
    try {
      const lista = await getReservas();
      setReservas(lista);
    } catch (error) {
      console.log("Erro ao carregar reserva:", error);
      setReservas([]);
    }
  };

  useEffect(() => {
    carregarReserva();
  }, []);

  const abrirModalEditar = (reserva) => {
    setReservaSelecionado(reserva);

    setReservaInicioEdit(reserva.data_reserva_inicio ?? "");
    setReservaFimEdit(reserva.data_reserva_fim ?? "");

    setModal(true);
  };


  const fecharModal = () => {
    setModal(false);
    setReservaSelecionado(null);
  };

  async function salvar() {
    try {
      const payload = {
        data_reserva_inicio: reservaInicioEdit,
        data_reserva_fim: reservaFimEdit
      }

      if (!reservaSelecionado.id) {
        alert("Nenhuma reserva selecionado");
        return;
      }

      const ok = await putReserva(reservaSelecionado.id, payload)

      if (ok === "") {
        alert("Não foi possivel editar seu reserva")
        return;
      }

      alert("Reserva editado com sucesso")

      await carregarReserva();
      fecharModal();

    } catch (error) {
      console.log("Error:", error)
    }
  }

  const remover = async (id) => {
    try {
      const excluido = await deleteReservas(id);

      if (excluido === "") {
        alert("Não deu pra excluir")
        return false;
      }

      alert("Excluiu a reserva")
      await carregarReserva();
    } catch (error) {
      console.log("Erro:", error);

    }
  }

  return (
    <div >
      <h2>Lista Reservas</h2>

      <table >
        <thead>
          <tr>
            <th>Cliente:</th>
            <th>Data de Entrada:</th>
            <th>Data de Entrada::</th>
            <th>Valor Reserva:</th>
          </tr>

        </thead>
        <tbody>
          {reservas && reservas.map((r) => (
            <tr key={r.id_reserva}>
              <td>{r.data_reserva_inicio}</td>
              <td>{r.data_reserva_fim}</td>
              <td>
                <button onClick={() => abrirModalEditar(r)}>
                  Editar
                </button>
                &nbsp;
                <button onClick={() => remover(r.id_reserva)}>
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal
        open={modal}
        onClose={fecharModal}
        onSave={salvar}
        title={"Editar reserva"}
      >
      </Modal>
    </div>
  )
}

export default ListaReservas