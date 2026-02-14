import axios from "axios";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/Context";

function FormularioVeiculos({ veiculoParaEditar, onSuccess, onClose }) {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    nome: "",
    modelo: "",
    ano: "",
    marca: "",
    status_bateria: "",
    usuario_cadastro: user.id_usuario || "",
    ativo: 1,
  });

  useEffect(() => {
    if (veiculoParaEditar) {
      setFormData({
        nome: veiculoParaEditar.nome,
        modelo: veiculoParaEditar.modelo,
        ano: veiculoParaEditar.ano,
        marca: veiculoParaEditar.marca,
        status_bateria: veiculoParaEditar.status_bateria,
        usuario_cadastro: veiculoParaEditar.usuario_cadastro,
        ativo: veiculoParaEditar.ativo,
      });
    } else {
      // Se não tem veículo (clicou em Adicionar), garante que o form fica limpo
      resetForm();
    }
  }, [veiculoParaEditar, user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "ativo" ? parseInt(value) : value,
    }));
  };

  const resetForm = () => {
    setFormData({
      nome: "",
      modelo: "",
      ano: "",
      marca: "",
      status_bateria: "",
      ativo: 0,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const dataToSave = {
        ...formData,
      };

      if (veiculoParaEditar &&(veiculoParaEditar.id_veiculo)) {
        const id = veiculoParaEditar.id_veiculo;
        await axios.put(`http://localhost:3000/veiculos/${id}`, dataToSave);
        alert("Veículo atualizado com sucesso!");
      }
      else {
        await axios.post("http://localhost:3000/veiculos", dataToSave);
        alert("Veículo cadastrado com sucesso!");
      }

      resetForm();
      if (onSuccess) onSuccess(); 
      if (onClose) onClose();
    } catch (e) {
      alert("Erro ao enviar informações!");
    }
  };
  return (
    <div>
      <div>
        <h2>Formulario veiculo</h2>
      </div>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nome">Nome Veiculo:</label>
          <input
            type="text"
            name="nome"
            id="nome"
            value={formData.nome}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label htmlFor="modelo">Modelo Veiculo:</label>
          <input
            type="text"
            name="modelo"
            id="modelo"
            value={formData.modelo}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label htmlFor="ano">Ano Veiculo:</label>
          <input
            type="text"
            name="ano"
            id="ano"
            value={formData.ano}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label htmlFor="marca">Marca Veiculo:</label>
          <input
            type="text"
            name="marca"
            id="marca"
            value={formData.marca}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label htmlFor="status_bateria">Status Bateria do Veiculo:</label>
          <input
            type="text"
            name="status_bateria"
            id="status_bateria"
            value={formData.status_bateria}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label htmlFor="ativo">Veiculo ativo:</label>
          <input
            type="text"
            name="ativo"
            id="ativo"
            value={formData.ativo}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label>
            <input
              type="radio"
              id="ativo"
              name="ativo"
              value={formData.ativo}
              onChange={handleInputChange}
              checked={formData.ativo === 1}
            />
            Veiculo Ativo
          </label>

          <label>
            <input
              type="radio"
              id="ativo"
              value={formData.ativo}
              name="ativo"
              onChange={handleInputChange}
              checked={formData.ativo === 0}
            />
            Veiculo Desativado
          </label>
        </div>

        <div>
          <button type="submit">Cadastrar Veiculo</button>
        </div>
      </form>
    </div>
  );
}

export default FormularioVeiculos;
