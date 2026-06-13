import { useEffect, useState } from "react";
import { listarUsuarios, novoUsuario, atualizarUsuario, deletarUsuario } from "../services/usuario";
import { useNavigate } from "react-router-dom";

export default function Usuarios() {
    const navigate = useNavigate();
    const [usuarios, setUsuarios] = useState([]);
    const [form, setForm] = useState({
        nome: "",
        cpf: "",
        senha: "",
        funcao: "medico",
        pergunta_seguranca: "",
        resposta_seguranca: ""
    });
    const [editando, setEditando] = useState(false);
    const [idEditando, setIdEditando] = useState(null);

    const carregarUsuarios = async () => {
        try {
            const response = await listarUsuarios();
            setUsuarios(response.data);
        } catch (error) {
            console.error(error);
            alert("Erro ao carregar usuários.");
        }
    };

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("usuario"));
        if (!user || user.funcao !== 'analista') {
            alert("Acesso negado. Apenas analistas podem gerenciar usuários.");
            navigate("/agendamentos");
            return;
        }
        carregarUsuarios();
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const salvarUsuario = async (e) => {
        e.preventDefault();
        try {
            if (!editando) {
                await novoUsuario(form);
                alert("Usuário cadastrado com sucesso!");
            } else {
                await atualizarUsuario(idEditando, form);
                alert("Usuário atualizado com sucesso!");
            }
            setForm({ nome: "", cpf: "", senha: "", funcao: "medico", pergunta_seguranca: "", resposta_seguranca: "" });
            setEditando(false);
            setIdEditando(null);
            carregarUsuarios();
        } catch (error) {
            alert(error.response?.data?.message || "Erro ao salvar usuário.");
        }
    };

    const editar = (u) => {
        setForm({
            nome: u.nome,
            cpf: u.cpf,
            senha: "",
            funcao: u.funcao,
            pergunta_seguranca: u.pergunta_seguranca || "",
            resposta_seguranca: ""
        });
        setEditando(true);
        setIdEditando(u.id);
    };

    const excluir = async (id) => {
        if (window.confirm("Deseja realmente excluir este usuário?")) {
            try {
                await deletarUsuario(id);
                alert("Usuário excluído!");
                carregarUsuarios();
            } catch (error) {
                alert("Erro ao excluir usuário.");
            }
        }
    };

    return (
        <div style={{ padding: "30px", fontFamily: "Arial" }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1>Cadastro de Usuários</h1>
                <button onClick={() => navigate("/agendamentos")} style={{ padding: '10px', backgroundColor: '#6c757d', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                    Ir para Agendamentos
                </button>
            </div>

            <form onSubmit={salvarUsuario} style={{ display: "flex", flexDirection: "column", gap: "10px", width: "400px", marginBottom: "30px", padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
                <h3>{editando ? "Editar Usuário" : "Novo Usuário"}</h3>
                <input type="text" name="nome" placeholder="Nome Completo" value={form.nome} onChange={handleChange} required style={{ padding: '8px' }} />
                <input type="text" name="cpf" placeholder="CPF" value={form.cpf} onChange={handleChange} required style={{ padding: '8px' }} />
                <input type="password" name="senha" placeholder={editando ? "Nova Senha (deixe em branco para manter)" : "Senha"} value={form.senha} onChange={handleChange} required={!editando} style={{ padding: '8px' }} />
                <select name="funcao" value={form.funcao} onChange={handleChange} style={{ padding: '8px' }}>
                    <option value="medico">Médico</option>
                    <option value="analista">Analista Administrativo</option>
                </select>
                <input type="text" name="pergunta_seguranca" placeholder="Pergunta de Segurança" value={form.pergunta_seguranca} onChange={handleChange} style={{ padding: '8px' }} />
                <input type="text" name="resposta_seguranca" placeholder="Resposta de Segurança" value={form.resposta_seguranca} onChange={handleChange} style={{ padding: '8px' }} />
                
                <button type="submit" style={{ padding: '10px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
                    {editando ? "Atualizar" : "Cadastrar"}
                </button>
                {editando && <button type="button" onClick={() => { setEditando(false); setForm({ nome: "", cpf: "", senha: "", funcao: "medico", pergunta_seguranca: "", resposta_seguranca: "" }); }} style={{ padding: '10px', backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Cancelar</button>}
            </form>

            <table border="1" cellPadding="10" style={{ borderCollapse: "collapse", width: "100%", textAlign: 'left' }}>
                <thead style={{ backgroundColor: '#f8f9fa' }}>
                    <tr>
                        <th>Nome</th>
                        <th>CPF</th>
                        <th>Função</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map((u) => (
                        <tr key={u.id}>
                            <td>{u.nome}</td>
                            <td>{u.cpf}</td>
                            <td>{u.funcao === 'medico' ? 'Médico' : 'Analista'}</td>
                            <td>
                                <button onClick={() => editar(u)} style={{ marginRight: '5px' }}>Editar</button>
                                <button onClick={() => excluir(u.id)} style={{ color: 'red' }}>Excluir</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
