import { useEffect, useState } from "react";
import { deleteReservas, getReservas, putReserva } from "../../service/reserva";
import FazerReserva from "../FazerReserva/FazerReserva";
import { getUsuarioByEmail } from "../../service/usuario";
import ModalReserva from "../Modal/Modal";

function ListaReservas() {
  const [reservas, setReservas] = useState([]);

  const [modal, setModal] = useState(false);

  const [reservaSelecionado, setReservaSelecionado] = useState(null);

  const [emailEdit, setEmailEdit] = useState("");
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
          console.log(reservas)

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
      const res = await getUsuarioByEmail(emailEdit);
      if (res.length === 0) {
        return alert("Usuario não encontrado, necessarios cadastrar Cliente")
      }

      const payload = {
        data_reserva_inicio: reservaInicioEdit,
        data_reserva_fim: reservaFimEdit,
        usuario_id: res.id_usuario,
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
      console.log(id)
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
    <div className="container mt-4">
      <h2>Lista Reservas</h2>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Data de Entrada:</th>
            <th>Data de Entrada::</th>
          </tr>

        </thead>
        <tbody>
          {reservas && reservas.map((r) => (
            <tr key={r.id_reserva}>
              <td>{r.data_reserva_inicio}</td>
              <td>{r.data_reserva_fim}</td>
              <td>
                <button className="btn btn-primary" onClick={() => abrirModalEditar(r)}>
                  Editar
                </button>
                &nbsp;
                <button className="btn btn-danger" onClick={() => remover(r.id_reserva)}>
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ModalReserva
        open={modal}
        onClose={fecharModal}
        onSave={salvar}
        title={"Editar reserva"}
      >
        <FazerReserva emailCliente={emailEdit} dataReservaEntrada={reservaInicioEdit} dataReservaSaida={reservaFimEdit} onChangeReservaEntrada={setReservaInicioEdit} onChangeReservaSaida={setReservaFimEdit} onChangeEmailCliente={setEmailEdit} />

      </ModalReserva>
    </div>
  )
}

export default ListaReservas