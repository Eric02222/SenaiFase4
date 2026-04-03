import { useEffect, useState } from "react";
import { getUsuarios, postUsuario, patchUsuario, deleteUsuario } from "../../services/usuario";
import ModalUsuario from "../../components/Modal/Modal";
import EditarUsuario from "../../components/EditarUsuario/EditarUsuario";

function ListaUsuarios() {
    const [usuarios, setUsuarios] = useState([]);

    const [modal, setModal] = useState(false);

    const [usuarioSelecionado, setUsuarioSelecionado] = useState(null);

    const [modo, setModo] = useState("edit");

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [tipoUsuario, setTipoUsuario] = useState(1);

    const carregarUsuarios = async () => {
        try {
            const lista = await getUsuarios();
            setUsuarios(lista.data || lista);
        } catch (error) {
            console.log("Erro ao carregar usuarios:", error);
            setUsuarios([]);
        }
    };

    useEffect(() => {
        carregarUsuarios();
    }, []);

    const abrirModalEditar = (usuario) => {
        setModo("edit");
        setUsuarioSelecionado(usuario);

        setNome(usuario.nome ?? "");
        setEmail(usuario.email ?? "");
        setSenha("");
        setTipoUsuario(usuario.tipo_usuario ?? "");

        setModal(true);
    };

    const abrirModalAdicionar = () => {
        setModo("add");
        setUsuarioSelecionado(null);

        setNome("");
        setEmail("");
        setSenha("");
        setTipoUsuario(1);

        setModal(true);
    };

    const fecharModal = () => {
        setModal(false);
        setUsuarioSelecionado(null);
    };

    async function salvar() {
        try {
            const data = {
                nome: nome,
                email: email,
                senha: senha,
                tipo_usuario: tipoUsuario
            }
            if (modo === "add") {
                data.senha = senha;
                const ok = await postUsuario(data);
                if (!ok) {xx
                    alert("Falha ao adicionar usuário.");
                    return;
                }
                alert("Usuário cadastrado com sucesso!");
            } else {
                // Edição
                if (!usuarioSelecionado?.id) {
                    alert("Nenhum usuário selecionado");
                    return;
                }

                const ok = await patchUsuario(usuarioSelecionado.id, data);

                if (!ok) {
                    alert("Não foi possível editar o usuário.");
                    return;
                }
                alert("Usuário editado com sucesso!");
            }

            await carregarUsuarios();
            fecharModal();
        } catch (error) {
            console.error("Erro ao salvar:", error);
            alert("Erro interno ao processar solicitação.");
        }
    }

    const remover = async (id) => {
        if (!confirm("Tem certeza que deseja excluir este usuário?")) return;

        try {
            const excluido = await deleteUsuario(id);

            if (!excluido) {
                alert("Não foi possível excluir o usuário.");
                return;
            }

            alert("Usuário excluído com sucesso!");
            await carregarUsuarios();
        } catch (error) {
            console.error("Erro ao remover:", error);
        }
    };

    return (
        <div className="container mt-4">
            <h2>Gerenciamento de Usuários</h2>

            <button className="btn btn-warning" onClick={abrirModalAdicionar}>
                Novo Usuário
            </button>

            <br />
            <br />

            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>E-mail</th>
                        <th>Tipo</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios && usuarios.length > 0 ? (
                        usuarios.map((u) => (
                            <tr key={u.id}>
                                <td>{u.nome}</td>
                                <td>{u.email}</td>
                                <td>{u.tipo_usuario}</td>
                                <td>
                                    <button className="btn btn-primary btn-sm" onClick={() => abrirModalEditar(u)}>
                                        Editar
                                    </button>
                                    &nbsp;
                                    <button className="btn btn-danger btn-sm" onClick={() => remover(u.id)}>
                                        Excluir
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="text-center">Nenhum usuário encontrado.</td>
                        </tr>
                    )}
                </tbody>
            </table>

            <ModalUsuario
                open={modal}
                onClose={fecharModal}
                onSave={salvar}
                title={modo === "add" ? "Cadastrar Usuário" : (usuarioSelecionado?.nome ?? "Editar usuario")}>

                <EditarUsuario
                    nome={nome}
                    email={email}
                    senha={senha}
                    tipoUsuario={tipoUsuario}
                    onChangeNome={setNome}
                    onChangeEmail={setEmail}
                    onChangeSenha={setSenha}
                    onChangeTipo={setTipoUsuario}
                    modo={modo}
                />
            </ModalUsuario>
        </div>
    )
}

export default ListaUsuarios