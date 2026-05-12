import { useEffect, useState } from "react";
import { getHistoricoReservas } from "../../service/reserva";

function HistoricoReservas() {
  const [reservas, setReservas] = useState([]);

  const carregarReserva = async () => {
    try {
      const lista = await getHistoricoReservas();

      setReservas(lista);

    } catch (error) {
      console.log("Erro ao carregar reserva:", error);
      setReservas([]);
    }
  };

  useEffect(() => {
    carregarReserva();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Historico Reservas</h2>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Data de Entrada:</th>
            <th>Data de Saida:</th>
            <th>Data de Excluido:</th>
          </tr>

        </thead>
        <tbody>
          {reservas && reservas.map((r) => (
            <tr key={r.id_reserva}>
              <td>{r.data_reserva_inicio}</td>
              <td>{r.data_reserva_fim}</td>
              <td>{r.data_excluido}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default HistoricoReservas