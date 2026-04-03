const EditarUsuario = ({ nome, email, senha, tipoUsuario, onChangeNome, onChangeEmail, onChangeSenha, onChangeTipo}) => {
    return (
        <div>
            <div className="mb-3">
                <label htmlFor="nome" className="form-label">Nome Completo</label>
                <input
                    type="text"
                    className="form-control"
                    id="nome"
                    placeholder="Ex: João Silva"
                    value={nome}
                    onChange={(e) => onChangeNome(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                    type="text"
                    className="form-control"
                    id="email"
                    placeholder="Ex: joao@gmail.com"
                    value={email}
                    onChange={(e) => onChangeEmail(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="senha" className="form-label">Senha</label>
                <input
                    type="password"
                    className="form-control"
                    id="senha"
                    placeholder="Mínimo 6 caracteres"
                    value={senha}
                    onChange={(e) => onChangeSenha(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="tipoUsuario" className="form-label">Tipo de Perfil</label>
                <select
                    className="form-select"
                    id="tipoUsuario"
                    value={tipoUsuario}
                    onChange={(e) => onChangeTipo(e.target.value)}
                >
                    <option value={1}>Administrador</option>
                    <option value={2}>Usuario Normal</option>
                </select>
            </div>
        </div>
    );
};

export default EditarUsuario;