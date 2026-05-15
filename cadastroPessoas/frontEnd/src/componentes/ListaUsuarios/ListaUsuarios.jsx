import { useEffect, useState } from 'react'
import { getUser } from '../../service/usuario'

function ListaUsuarios() {
    const [usuarios, setUsuarios] = useState([]);
    const [procurarUsuario, setProcurarUsuario] = useState('')

    const carregaUsuario = async () => {
        try {
            const user = await getUser();
            setUsuarios(user);
        } catch (error) {
            console.log("Erro ao carregar reserva:", error);
            setUsuarios([]);
        }
    };

    useEffect(() => {
        carregaUsuario();
    }, []);

    const handleProcuraUsuario = (e) => {
        setProcurarUsuario(e.target.value)
    }

    const filtroUsuairos = usuarios.filter((usuario) =>
        [usuario.nome, usuario.email, usuario.cpf_cnpj].join(" ").toLowerCase().includes(procurarUsuario.toLowerCase())
    );

    return (
        <div>
            <div>
                <label htmlFor="procurar">Buscar Usuario:</label>
                <input type="text" id='procurar' value={procurarUsuario} onChange={handleProcuraUsuario} placeholder='Digite as informações do usuario' />
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>email</th>
                        <th>cpf</th>
                    </tr>
                </thead>

                {filtroUsuairos.length > 0 ? (
                    <tbody>
                        {filtroUsuairos.map((u, index) => (
                            <tr key={index}>
                                <td key={index}>{u.nome}</td>
                                <td key={index}>{u.email}</td>
                                <td key={index}>{u.cpf_cnpj}</td>
                            </tr>
                        ))}
                    </tbody>
                ) : (
                    <p >
                        Nenhum Usuario encontrado.
                    </p>
                )}
            </table>
        </div>
    )
}

export default ListaUsuarios