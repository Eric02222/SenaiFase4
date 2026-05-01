const FazerAgendamento = ({dataAgendamento, endereco, onChangeAgendamento, onChangeEndereco}) => {
    return(
        <div>

            <div>
                <label htmlFor="endeco">Local do Serviço</label>
                <input type="text" id="endeco" value={endereco} onChange={(e) => onChangeEndereco(e.target.value)}/>
            </div>

            <div>
                <label htmlFor="dataServico">Data do Serviço</label>
                <input type="datetime-local" id="dataServico" value={dataAgendamento} onChange={(e) => onChangeAgendamento(e.target.value)}/>
            </div>

        </div>
    );
}   

export default FazerAgendamento;