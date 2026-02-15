import axios from "axios";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/Context";
import styles from "./FormularioVeiculos.module.css";

function FormularioVeiculos({ veiculoParaEditar, onSuccess, onClose }) {
  const { user } = useAuth();
  const usuario = user?.data?.usuario?.id_usuario;
  const [formData, setFormData] = useState({
    nome: "",
    modelo: "",
    ano: "",
    marca: "",
    status_bateria: "",
    usuario_cadastro: usuario || "",
    ativo: 1,
  });

  const isEditing = !!veiculoParaEditar;

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
      usuario_cadastro: usuario,
      ativo: 1,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const dataToSave = {
        ...formData,
        usuario_cadastro: usuario,
      };

      if (veiculoParaEditar && veiculoParaEditar.id_veiculo) {
        const id = veiculoParaEditar.id_veiculo;
        await axios.put(`http://localhost:3000/veiculos/${id}`, dataToSave);
        alert("Veículo atualizado com sucesso!");
      } else {
        await axios.post("http://localhost:3000/veiculos", dataToSave);
        alert("Veículo cadastrado com sucesso!");
      }

      resetForm();
      if (onSuccess) onSuccess();
      if (onClose) onClose();
    } catch (e) {
      alert("Erro ao enviar informações!");
      console.error(e);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.titulo}>
          {isEditing ? "Editar Veículo" : "Cadastrar Veículo"}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className={styles.grid}>
            <div className={styles.inputGroup}>
              <label htmlFor="nome" className={styles.label}>
                Nome Veiculo:
              </label>
              <input
                type="text"
                name="nome"
                id="nome"
                value={formData.nome}
                onChange={handleInputChange}
                className={styles.input}
                required
              />
            </div>

            <div className={styles.inputGroup}>
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

            <div className={styles.inputGroup}>
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

            <div className={styles.inputGroup}>
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

            <div className={styles.inputGroup}>
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

            <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
              <label className={styles.label}>Situação do Veículo:</label>
              <div className={styles.radioContainer}>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="ativo"
                    value="1" /* Valor fixo 1 para ativo */
                    onChange={handleInputChange}
                    checked={formData.ativo === 1}
                  />
                  Veículo Ativo
                </label>

                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="ativo"
                    value="0"
                    onChange={handleInputChange}
                    checked={formData.ativo === 0}
                  />
                  Veículo Desativado
                </label>
              </div>
            </div>
          </div>

          <div className={`${styles.botoesContainer} ${styles.fullWidth}`}>
            <button className={styles.btnPrincipal} type="submit">
              {isEditing ? "Salvar Alterações" : "Cadastrar Veículo"}
            </button>

            {onClose && (
              <button
                type="button"
                className={styles.btnCancelar}
                onClick={onClose}
              >
                Cancelar
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormularioVeiculos;
