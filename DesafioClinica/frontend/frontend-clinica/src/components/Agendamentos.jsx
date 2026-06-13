import { useEffect, useState } from "react";
import { listarAgendamentos, novoAgendamento, atualizarAgendamento, deletarAgendamento } from "../services/agendamento";
import { listarUsuarios } from "../services/usuario";
import { useNavigate } from "react-router-dom";

export default function Agendamentos() {
    const navigate = useNavigate();
    const [agendamentos, setAgendamentos] = useState([]);
    const [medicos, setMedicos] = useState([]);
    const [userLogado, setUserLogado] = useState(null);

    const [form, setForm] = useState({
        paciente_nome: "",
        medico_id: "",
        data_hora: ""
    });
    const [editando, setEditando] = useState(false);
    const [idEditando, setIdEditando] = useState(null);

    const carregarDados = async () => {
        try {
            const [resAgendamentos, resUsuarios] = await Promise.all([
                listarAgendamentos(),
                listarUsuarios()
            ]);
            setAgendamentos(resAgendamentos.data);
            setMedicos(resUsuarios.data.filter(u => u.funcao === 'medico'));
        } catch (error) {
            console.error(error);
            alert("Erro ao carregar dados.");
        }
    };

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("usuario"));
        if (!user) {
            navigate("/login");
            return;
        }
        setUserLogado(user);
        carregarDados();
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const salvar = async (e) => {
        e.preventDefault();
        try {
            const dataHoraFormatada = form.data_hora.replace('T', ' ') + ':00';
            
            const payload = { ...form, data_hora: dataHoraFormatada };

            if (!editando) {
                await novoAgendamento(payload);
                alert("Agendamento realizado!");
            } else {
                await atualizarAgendamento(idEditando, payload);
                alert("Agendamento atualizado!");
            }
            setForm({ paciente_nome: "", medico_id: "", data_hora: "" });
            setEditando(false);
            setIdEditando(null);
            carregarDados();
        } catch (error) {
            alert(error.response?.data?.message || "Erro ao salvar agendamento.");
        }
    };

    const editar = (a) => {
        const dataInput = a.data_hora.replace(' ', 'T').substring(0, 16);
        setForm({
            paciente_nome: a.paciente_nome,
            medico_id: a.medico_id,
            data_hora: dataInput
        });
        setEditando(true);
        setIdEditando(a.id);
    };

    const excluir = async (id) => {
        if (window.confirm("Deseja excluir este agendamento?")) {
            try {
                await deletarAgendamento(id);
                alert("Agendamento excluído!");
                carregarDados();
            } catch (error) {
                alert("Erro ao excluir.");
            }
        }
    };

    const logout = () => {
        localStorage.removeItem("usuario");
        navigate("/login");
    };

    return (
        <div style={{ padding: "30px", fontFamily: "Arial" }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h1>Agendamento de Consultas</h1>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <span>Bem-vindo, <strong>{userLogado?.nome}</strong> ({userLogado?.funcao})</span>
                    {userLogado?.funcao === 'analista' && (
                        <button onClick={() => navigate("/usuarios")} style={{ padding: '8px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                            Gerenciar Usuários
                        </button>
                    )}
                    <button onClick={logout} style={{ padding: '8px', backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                        Sair
                    </button>
                </div>
            </div>

            <form onSubmit={salvar} style={{ display: "flex", flexDirection: "column", gap: "10px", width: "400px", marginBottom: "30px", padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
                <h3>{editando ? "Editar Agendamento" : "Novo Agendamento"}</h3>
                <input type="text" name="paciente_nome" placeholder="Nome do Paciente" value={form.paciente_nome} onChange={handleChange} required style={{ padding: '8px' }} />
                <select name="medico_id" value={form.medico_id} onChange={handleChange} required style={{ padding: '8px' }}>
                    <option value="">Selecione o Médico</option>
                    {medicos.map(m => (
                        <option key={m.id} value={m.id}>{m.nome}</option>
                    ))}
                </select>
                <input type="datetime-local" name="data_hora" value={form.data_hora} onChange={handleChange} required style={{ padding: '8px' }} />
                
                <button type="submit" style={{ padding: '10px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
                    {editando ? "Atualizar Agendamento" : "Agendar Consulta"}
                </button>
                {editando && <button type="button" onClick={() => { setEditando(false); setForm({ paciente_nome: "", medico_id: "", data_hora: "" }); }} style={{ padding: '10px', backgroundColor: '#6c757d', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Cancelar</button>}
            </form>

            <table border="1" cellPadding="10" style={{ borderCollapse: "collapse", width: "100%", textAlign: 'left' }}>
                <thead style={{ backgroundColor: '#f8f9fa' }}>
                    <tr>
                        <th>Paciente</th>
                        <th>Médico</th>
                        <th>Data e Hora</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {agendamentos.map((a) => (
                        <tr key={a.id}>
                            <td>{a.paciente_nome}</td>
                            <td>{a.medico_nome}</td>
                            <td>{new Date(a.data_hora).toLocaleString('pt-BR')}</td>
                            <td>
                                <button onClick={() => editar(a)} style={{ marginRight: '5px' }}>Editar</button>
                                <button onClick={() => excluir(a.id)} style={{ color: 'red' }}>Excluir</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
