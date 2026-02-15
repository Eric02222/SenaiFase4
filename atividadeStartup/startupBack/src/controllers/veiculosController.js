import db from "../config/db.js";

class VeiculosController {
  constructor() {}

  // Controller para pegar todos veiculos
  async getTodosVeiculos(req, res) {
    try {
      const [rows] = await db.query("SELECT * FROM veiculo");
      return res.json(rows);
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: "Erro ao buscar veiculos" });
    }
  }

  // Controler para pegar veiculo por id
  async getVeiculosPorId(req, res) {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({ error: "ID do usuário inválido." });
    }

    try {
      const [rows] = await db.query(
        "SELECT * FROM veiculo WHERE id_veiculo = ?",
        [id],
      );

      if (rows.length === 0) {
        return res.status(404).json({ error: "Veiculo não encontrado" });
      }
      res.json(rows[0]);
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: "Erro ao buscar veiculo" });
    }
  }

  // Controller para pegar beiculos com base no id do usuarios
  async getVeiculosPorIdUsuario(req, res) {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({ error: "ID do usuário inválido." });
    }

    try {
      const [rows] = await db.query(
        "SELECT * FROM veiculo WHERE usuario_cadastro = ?",
        [id],
      );

      if (rows.length === 0) {
        return res.status(404).json({ error: "Veiculo não encontrado" });
      }
      res.status(200).json(rows);
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: "Erro ao buscar veiculo" });
    }
  }

  //Controller para postar veiculo
  async postVeiculos(req, res) {
    const {
      nome,
      modelo,
      ano,
      marca,
      status_bateria,
      usuario_cadastro,
      ativo,
    } = req.body;
    console.log(req.body);
    try {
      const [result] = await db.query(
        "INSERT INTO Veiculo (nome, modelo, ano, marca, status_bateria, usuario_cadastro, dataHora_cadastro, ativo) VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIME(), ?)",
        [nome, modelo, ano, marca, status_bateria, usuario_cadastro, ativo]
      );
      const [novoVeiculo] = await db.query(
        "SELECT * FROM veiculo WHERE id_veiculo = ?",
        [result.insertId],
      );
      res.status(201).json(novoVeiculo[0]);
    } catch (e) {
      console.error(e.message);
      res.status(500).json({ error: "Erro ao adicionar Veiculo" });
    }
  }

  //Controller para arualizar veiculo
  async putVeiculos(req, res) {
    const { id } = req.params;
    const {
      nome,
      modelo,
      ano,
      marca,
      status_bateria,
      ativo,
    } = req.body;

    console.log(req.body);

    try {
      const [rows] = await db.query(
        "SELECT * FROM veiculo WHERE id_veiculo = ?",
        [id],
      );

      // 2. Verifica se o veículo realmente existe
      if (rows.length === 0) {
        return res.status(404).json({ error: "Veículo não encontrado." });
      }

      const veiculoAtual = rows[0];

      if (veiculoAtual.dataHora_exclusao !== null) {
        return res.status(403).json({
          error: "Não é possível editar um veículo que já foi excluído.",
        });
      }

      const [result] = await db.query(
        "UPDATE Veiculo SET nome = ?, modelo = ?, ano = ?, marca = ?, status_bateria = ?, dataHora_atualização = CURRENT_TIME(), ativo = ? WHERE id_veiculo = ?",
        [nome, modelo, ano, marca, status_bateria, ativo, id]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Veiculo não encontrado" });
      }

      const [veiculoAtualizado] = await db.query(
        "SELECT * FROM veiculo WHERE id_veiculo = ?",
        [id],
      );

      res.status(200).json(veiculoAtualizado[0]);
    } catch (e) {
      console.error(e.message);
      res.status(500).json({ error: "Erro ao adicionar Veiculo" });
    }
  }

  //Controller para deletar veiculo
  async deleteVeiculos(req, res) {
    const { id } = req.params;
    try {
      const [result] = await db.query(
        "UPDATE veiculo SET ativo = 0, dataHora_exclusao = CURRENT_TIME() WHERE id_veiculo = ?",
        [id],
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Veiculo não encontrado" });
      }

      res.json({ message: "Veiculo deletado com sucesso" });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: "Erro ao deletar Veiculo" });
    }
  }
}

export const veiculosController = new VeiculosController();
