import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, recuperarSenha, buscarUsuarioPorCpf } from "../services/usuario";

export default function Login() {
    const navigate = useNavigate();
    const [cpf, setCpf] = useState("");
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState("");
    const [loading, setLoading] = useState(false);

    const [mostrarRecuperar, setMostrarRecuperar] = useState(false);
    const [cpfRecuperar, setCpfRecuperar] = useState("");
    const [perguntaSeguranca, setPerguntaSeguranca] = useState("");
    const [respostaSeguranca, setRespostaSeguranca] = useState("");
    const [novaSenha, setNovaSenha] = useState("");
    const [passoRecuperar, setPassoRecuperar] = useState(1);

    const fazerLogin = async (e) => {
        e.preventDefault();
        setErro("");

        if (!cpf || !senha) {
            setErro("Preencha CPF e senha.");
            return;
        }

        try {
            setLoading(true);
            const response = await loginUser({ cpf, senha });
            localStorage.setItem("usuario", JSON.stringify(response.data.usuario));
            alert("Login realizado com sucesso!");
            navigate("/agendamentos");
        } catch (error) {
            console.error(error);
            setErro(error.response?.data?.message || "CPF ou senha inválidos.");
        } finally {
            setLoading(false);
        }
    };

    const iniciarRecuperacao = async () => {
        try {
            setErro("");
            const response = await buscarUsuarioPorCpf(cpfRecuperar);
            if (response.data.pergunta_seguranca) {
                setPerguntaSeguranca(response.data.pergunta_seguranca);
                setPassoRecuperar(2);
            } else {
                setErro("Usuário não possui pergunta de segurança cadastrada.");
            }
        } catch (error) {
            setErro("Usuário não encontrado.");
        }
    };

    const finalizarRecuperacao = async () => {
        try {
            setErro("");
            await recuperarSenha({
                cpf: cpfRecuperar,
                resposta_seguranca: respostaSeguranca,
                nova_senha: novaSenha
            });
            alert("Senha alterada com sucesso!");
            setMostrarRecuperar(false);
            setPassoRecuperar(1);
        } catch (error) {
            setErro(error.response?.data?.message || "Erro ao recuperar senha.");
        }
    };

    return (
        <div style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#f4f6f9", fontFamily: "Arial" }}>
            <div style={{ width: "400px", backgroundColor: "#fff", padding: "40px", borderRadius: "10px", boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}>
                <h1 style={{ textAlign: "center", marginBottom: "30px", color: "#333", fontSize: '24px' }}>
                    Clínica de Saúde Integrada
                </h1>

                {!mostrarRecuperar ? (
                    <form onSubmit={fazerLogin} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                        <input
                            type="text"
                            placeholder="Digite seu CPF (000.000.000-00)"
                            value={cpf}
                            onChange={(e) => setCpf(e.target.value)}
                            style={{ padding: "12px", borderRadius: "5px", border: "1px solid #ccc" }}
                        />
                        <input
                            type="password"
                            placeholder="Digite sua senha"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            style={{ padding: "12px", borderRadius: "5px", border: "1px solid #ccc" }}
                        />
                        {erro && <div style={{ backgroundColor: "#ffe5e5", color: "#d10000", padding: "10px", borderRadius: "5px", fontSize: "14px" }}>{erro}</div>}
                        <button type="submit" disabled={loading} style={{ padding: "12px", border: "none", borderRadius: "5px", backgroundColor: "#007bff", color: "#fff", cursor: "pointer", fontWeight: "bold" }}>
                            {loading ? "Entrando..." : "Entrar"}
                        </button>
                        <button type="button" onClick={() => setMostrarRecuperar(true)} style={{ background: 'none', border: 'none', color: '#007bff', cursor: 'pointer', fontSize: '14px' }}>
                            Esqueci minha senha
                        </button>
                    </form>
                ) : (
                    <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                        <h2 style={{ fontSize: '18px', textAlign: 'center' }}>Recuperar Senha</h2>
                        {passoRecuperar === 1 ? (
                            <>
                                <input
                                    type="text"
                                    placeholder="Informe seu CPF"
                                    value={cpfRecuperar}
                                    onChange={(e) => setCpfRecuperar(e.target.value)}
                                    style={{ padding: "12px", borderRadius: "5px", border: "1px solid #ccc" }}
                                />
                                <button onClick={iniciarRecuperacao} style={{ padding: "12px", border: "none", borderRadius: "5px", backgroundColor: "#28a745", color: "#fff", cursor: "pointer", fontWeight: "bold" }}>
                                    Próximo
                                </button>
                            </>
                        ) : (
                            <>
                                <p><strong>Pergunta:</strong> {perguntaSeguranca}</p>
                                <input
                                    type="text"
                                    placeholder="Sua resposta"
                                    value={respostaSeguranca}
                                    onChange={(e) => setRespostaSeguranca(e.target.value)}
                                    style={{ padding: "12px", borderRadius: "5px", border: "1px solid #ccc" }}
                                />
                                <input
                                    type="password"
                                    placeholder="Nova senha"
                                    value={novaSenha}
                                    onChange={(e) => setNovaSenha(e.target.value)}
                                    style={{ padding: "12px", borderRadius: "5px", border: "1px solid #ccc" }}
                                />
                                <button onClick={finalizarRecuperacao} style={{ padding: "12px", border: "none", borderRadius: "5px", backgroundColor: "#28a745", color: "#fff", cursor: "pointer", fontWeight: "bold" }}>
                                    Alterar Senha
                                </button>
                            </>
                        )}
                        {erro && <div style={{ backgroundColor: "#ffe5e5", color: "#d10000", padding: "10px", borderRadius: "5px", fontSize: "14px" }}>{erro}</div>}
                        <button onClick={() => { setMostrarRecuperar(false); setPassoRecuperar(1); setErro(""); }} style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer', fontSize: '14px' }}>
                            Voltar ao login
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
