const FazerReserva = ({ emailCliente, dataReservaEntrada, dataReservaSaida, onChangeReservaEntrada, onChangeReservaSaida, onChangeEmailCliente }) => {
    return (
        <div>

            <div>
                <label htmlFor="emailCliente">Email:</label>
                <input type="email" id="emailCliente" value={emailCliente} onChange={(e) => onChangeEmailCliente(e.target.value)} />
            </div>


            <div>
                <label htmlFor="dataReservaEntrada">Data de entrada:</label>
                <input type="datetime-local" id="dataReservaEntrada" value={dataReservaEntrada} onChange={(e) => onChangeReservaEntrada(e.target.value)} />
            </div>

            <div>
                <label htmlFor="dataReservaSaida">Data de Saida:</label>
                <input type="datetime-local" id="dataReservaSaida" value={dataReservaSaida} onChange={(e) => onChangeReservaSaida(e.target.value)} />
            </div>

        </div>
    );
}

export default FazerReserva;