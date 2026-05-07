const CriarQuarto = ({ numeroQuarto, capacidadeHospedes, tipoQuarto, preco, onChangeNumeroQuarto, onChangeCapacidadeHospedes, onChangeTipoQuarto, onChangePreco }) => {
    return (
        <div>

            <div>
                <label htmlFor="numeroQuarto">Numero do Quarto:</label>
                <input type="number" id="numeroQuarto" value={numeroQuarto} onChange={(e) => onChangeNumeroQuarto(e.target.value)} />
            </div>


            <div>
                <label htmlFor="capacidadeHospedes">Capacidade de hospedes:</label>
                <input type="number" id="capacidadeHospedes" value={capacidadeHospedes} onChange={(e) => onChangeCapacidadeHospedes(e.target.value)} />
            </div>

            <div>
                <label htmlFor="tipoQuarto">Tipo do Quarto:</label>
                <select nome="tipoQuarto" id='tipoQuarto' value={tipoQuarto} onChange={(e) => onChangeTipoQuarto(e.target.value)}>
                    <option value={"Simples"}>Simples</option>
                    <option value={"Duplo"}>Duplo</option>
                    <option value={"Suíte"}>Suíte</option>
                </select>
            </div>

            <div>
                <label htmlFor="valorQuarto">Valor do Quarto:</label>
                <input type="number" id="valorQuarto" value={preco} onChange={(e) => onChangePreco(e.target.value)} />
            </div>
        </div>
    );
}

export default CriarQuarto;