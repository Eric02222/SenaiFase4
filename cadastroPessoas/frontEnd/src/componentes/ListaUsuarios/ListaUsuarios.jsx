import { useEffect, useState } from 'react'
import { getUser } from '../../service/usuario'

function ListaUsuarios() {
    const [usuarios, setUsuarios] = useState([])

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

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>email</th>
                        <th>cpf</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map((u, index) => (
                        <tr key={index}>
                            <td key={index}>{u.nome}</td>
                            <td key={index}>{u.email}</td>
                            <td key={index}>{u.cpf}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ListaUsuarios