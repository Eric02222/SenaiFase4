import { useEffect, useState } from "react";
import { getProdutos, postProduto, deleteProduto, patchProduto } from "../../services/produto";
import ModalProduto from "../Modal/Modal";
import EditarProduto from "../EditarProduto/EditarProduto";

function Produto() {
    const [produtos, setProdutos] = useState([]);

    const [modal, setModal] = useState(false);

    const [produtoSelecionado, setProdutoSelecionado] = useState(null);

    const [modo, setModo] = useState("edit");

    // const [salvar, setSalvar] = useState('');

    const [tituloEdit, setTituloEdit] = useState("");
    const [descricaoEdit, setDescricaoEdit] = useState("");
    const [valorEdit, setValorEdit] = useState("");

    const carregarProdutos = async () => {
        try {
            const lista = await getProdutos();
            setProdutos(lista);
        } catch (error) {
            console.log("Erro ao carregar produtos:", error);
            setProdutos([]);
        }
    };

    useEffect(() => {
        carregarProdutos();
    }, []);

    const abrirModalEditar = (produto) => {
        setModo("edit");
        setProdutoSelecionado(produto);

        setTituloEdit(produto.nome ?? "");
        setDescricaoEdit(produto.descricao ?? "");
        setValorEdit(produto.valor ?? "");

        setModal(true);
    };

    const abrirModalAdicionar = () => {
        setModo("add");
        setProdutoSelecionado(null);

        setTituloEdit("");
        setDescricaoEdit("");
        setValorEdit("");

        setModal(true);
    };

    const fecharModal = () => {
        setModal(false);
        setProdutoSelecionado(null);
    };

    async function salvar() {
        try {
            const payload = {
                nome: tituloEdit,
                valor: Number(valorEdit) > 0 ? valorEdit : 0,
                descricao: descricaoEdit
            }

            if (modo === "add") {
                const ok = await postProduto(payload);

                if (ok === "") {
                    alert("Falha ao adicionar produto.")
                    return false;
                }
                alert("Produto Adicionado com sucesso")

                await carregarProdutos();
                fecharModal();
            } else {
                if (!produtoSelecionado.id) {
                    alert("Nenhum produto selecionado");
                    return;
                }

                const ok = await patchProduto(produtoSelecionado.id, payload)

                if (ok === "") {
                    alert("Não foi possivel editar seu produto")
                    return;
                }

                alert("Produto editado com sucesso")

                await carregarProdutos();
                fecharModal();
            }
        } catch (error) {
            console.log("Error:", error)
        }
    }

    const remover = async (id) => {
        try {
            const excluido = await deleteProduto(id);

            if (excluido === "") {
                alert("Não deu pra excluir, se lascou")
                return false;
            }

            alert("Excluiu o produto, Parabens")
            await carregarProdutos();
        } catch (error) {
            console.log("Erro:", error);

        }
    }

    return (
        <div className="container mt-4">
            <h2>Gerenciamento de Produtos</h2>
            <button className="btn btn-warning" onClick={abrirModalAdicionar}>
                Adicionar
            </button>

            <br />
            <br />

            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Nome:</th>
                        <th>Descrição:</th>
                        <th>Valor:</th>
                        <th>Ações:</th>
                    </tr>

                </thead>
                <tbody>
                    {produtos && produtos.map((p) => (
                        <tr key={p.id}>
                            <td>{p.nome}</td>
                            <td>{p.descricao}</td>
                            <td>{p.valor}</td>
                            <td>
                                <button className="btn btn-primary" onClick={() => abrirModalEditar(p)}>
                                    Editar
                                </button>
                                &nbsp;
                                <button className="btn btn-danger" onClick={() => remover(p.id)}>
                                    Excluir
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <ModalProduto
                open={modal}
                onClose={fecharModal}
                onSave={salvar}
                title={modo === "add" ? "Adicionar produto" : (produtoSelecionado?.nome ?? "Editar produto")}
            >
                <EditarProduto
                    titulo={tituloEdit}
                    descricao={descricaoEdit}
                    valor={valorEdit}
                    onChangeTitulo={setTituloEdit}
                    onChangeDescricao={setDescricaoEdit}
                    onChangeValor={setValorEdit}
                />
            </ModalProduto>
        </div>
    )
}

export default Produto