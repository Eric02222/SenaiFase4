import { useEffect, useState } from "react"
import { getFuncionario } from "../../services/funcionario.js"

function ListaFuncionarios() {
  const [funcionarios, setFuncionarios] = useState([])

  const carregarFuncionarios = async () => {
    try {
      const lista = await getFuncionario()
      console.log(lista.data)
      setFuncionarios(lista)
    } catch (error) {
      console.log('Error ao carregar funcionarios', error)
      setFuncionarios([])
    }
  }

  useEffect(() => {
    carregarFuncionarios()
  }, [])

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Nome:</th>
            <th>Email:</th>
            <th>Endereço:</th>
            <th>Numero telefone:</th>
          </tr>
        </thead>

        <tbody>
          {funcionarios && funcionarios.map((f) => (
            <tr key={f.id_funcionario}>
              <td>{f.nome}</td>
              <td>{f.email}</td>
              <td>{f.endereco}</td>
              <td>{f.numero_telefone}</td>
            </tr>

            
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ListaFuncionarios