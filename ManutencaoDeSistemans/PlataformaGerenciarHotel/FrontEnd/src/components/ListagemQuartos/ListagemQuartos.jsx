import { useEffect, useState } from "react"
import { getQuartos, postQuartos } from "../../service/quarto"
import { getUsuarioByEmail } from "../../service/usuario";
import { postReserva } from "../../service/reserva";
import FazerReserva from "../FazerReserva/FazerReserva";
import ModalCriarQuarto from "../Modal/ModalCriarQuarto";
import CriarQuarto from "../CriarQuarto/CriarQuarto";
import ModalReserva from "../Modal/Modal";

function ListagemQuartos() {
  //lista quartos
  const [listaQuartos, setListaQuartos] = useState([])

  //dados para informações
  const [modalReserva, setModalReserva] = useState(false);
  const [modalQuarto, setModalQuarto] = useState(false);
  const [clienteEmail, setClienteEmail] = useState("");
  const [quartoSelecionado, setQuartoSelecionado] = useState(null);
  const [dataEntradaReserva, setDataEntradaReserva] = useState("")
  const [dataSaidaReserva, setDataSaidaReserva] = useState("")

  //dados para criar quarto
  const [numeroQuarto, setNumeroQuarto] = useState("")
  const [capacidadeHospedes, setCapacidadeHospedes] = useState("")
  const [tipoQuarto, setTipoQuarto] = useState("")
  const [preco, setPreco] = useState("")


  const carregarQuarto = async () => {
    try {
      const lista = await getQuartos();

      setListaQuartos(lista)
    } catch (error) {
      console.log("Não foi possivel carregar quartos", error)
      setListaQuartos([])
    }
  }


  useEffect(() => {
    carregarQuarto()
  }, [])


  const fecharModal = () => {
    setModalReserva(false);
    setModalQuarto(false);
    setQuartoSelecionado(null);

  };

  const abrirModalReserva = (quarto) => {
    setQuartoSelecionado(quarto);

    setModalReserva(true);
  };

  const abrirModalQuarto = () => {
    setModalQuarto(true);
  };

  const salvarReserva = async (e) => {
    e.preventDefault()
    try {
      const res = await getUsuarioByEmail(clienteEmail);
      if (res.length === 0) {
        return alert("Usuario não encontrado, necessarios cadastrar Cliente")
      }

      const data = {
        data_reserva_inicio: dataEntradaReserva,
        data_reserva_fim: dataSaidaReserva,
        usuario_id: res.id_usuario,
        quarto_id: quartoSelecionado.id_quarto
      };


      const ok = await postReserva(data);

      if (ok === "") {
        alert("Não foi possivel fazer reserva!");
        return false;
      }

      alert("Reserva feito com sucesso!");
      fecharModal();

    } catch (error) {

    }
  }

  const salvarQuarto = async (e) => {
    e.preventDefault()
    try {
      const data = {
        numero_quarto: numeroQuarto,
        capacidade_hospedes: capacidadeHospedes,
        tipo_quarto: tipoQuarto,
        preco: preco
      };

      const ok = await postQuartos(data);

      if (ok === "") {
        alert("Não foi possivel fazer reserva!");
        return false;
      }

      alert("Reserva feito com sucesso!");
      fecharModal();

    } catch (error) {

    }
  }


  return (
    <div >
      <h2>Lista Reservas</h2>

      <button className="btn btn-primary" onClick={() => abrirModalQuarto(q)}>
        Adicionar quarto
      </button>


      <table >
        <thead>
          <tr>
            <th>Numero do quarto:</th>
            <th>Tipo de quarto:</th>
            <th>Capacidade de hospedes:</th>
            <th>Preço:</th>
          </tr>

        </thead>
        <tbody>
          {listaQuartos && listaQuartos.map((q) => (
            <tr key={q.id_quarto}>
              <td>{q.numero_quarto}</td>
              <td>{q.tipo_quarto}</td>
              <td>{q.capacidade_hospedes}</td>
              <td>{q.preco}</td>
              <td>
                <button className="btn btn-primary" onClick={() => abrirModalReserva(q)}>
                  Fazer Reserva
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ModalReserva
        open={modalReserva}
        onClose={fecharModal}
        onSave={salvarReserva}
        title={"Fazer reserva"}
      >
        <FazerReserva emailCliente={clienteEmail} dataReservaEntrada={dataEntradaReserva} dataReservaSaida={dataSaidaReserva} onChangeReservaEntrada={setDataSaidaReserva} onChangeReservaSaida={setDataEntradaReserva} onChangeEmailCliente={setClienteEmail} />
      </ModalReserva>

      <ModalCriarQuarto
        open={modalQuarto}
        onClose={fecharModal}
        onSave={salvarQuarto}
        title={"Adicionar quarto"}>
        <CriarQuarto numeroQuarto={numeroQuarto} capacidadeHospedes={capacidadeHospedes} tipoQuarto={tipoQuarto} preco={preco} onChangeNumeroQuarto={setNumeroQuarto} onChangeCapacidadeHospedes={setCapacidadeHospedes} onChangeTipoQuarto={setTipoQuarto} onChangePreco={setPreco}/>
      </ModalCriarQuarto>
    </div >
  )
}

export default ListagemQuartos