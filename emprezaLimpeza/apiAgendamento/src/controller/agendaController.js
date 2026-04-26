import db from "../config/db.js";

const postAgenda = async (req, res) => {
  try {
    const { data_servico, ativo, cliente_id, funcionario_id } = req.body;

    const [result] = await db.query(
      "INSERT INTO agendamento (data_servico, ativo, cliente_id, funcionario_id, data_criado) VALUES (?, ?, ?, ?, CURRENT_TIME())",
      [data_servico, ativo, cliente_id, funcionario_id],
    );

    if (result.affectedRows === 0) {
      return res.status(400).json({
        message: "Não foi possivel inserir o agendamento",
        success: false,
      });
    }

    return res
      .status(201)
      .json({ message: "Agendamento cadastrado com sucesso", success: true });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Erro ao criar agendamento", error: error.message });
  }
};

const getAgenda = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM agendamento");
    return res.status(200).json({ success: true, data: rows });
  } catch (error) {
    console.error("Erro ao buscar agendamento:", error);
    return res
      .status(500)
      .json({ message: "Erro ao buscar agendamento", error: error.message });
  }
};

const getAgendaById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.query("SELECT * FROM agendamento WHERE id_agendamento = ?", [
      id,
    ]);

    if (rows.length === 0) {
      return res
        .status(404)
        .json({ message: "Agendamento não encontrado", success: false });
    }

    return res.status(200).json({ success: true, data: rows[0] });
  } catch (error) {
    console.error("Erro ao buscar agendamento:", error);
    return res
      .status(500)
      .json({ message: "Erro ao buscar agendamento", error: error.message });
  }
};

const editarAgenda = async (req, res) => {
  try {
    const { id } = req.params;
    const { data_servico, ativo, cliente_id, funcionario_id } = req.body;

    if (!id) {
      return res
        .status(400)
        .json({
          message: "O ID do agendamento é obrigatório.",
          success: false,
        });
    }

    const [result] = await db.query(
      "UPDATE agendamento SET data_servico = ?, ativo = ? WHERE id_agendamento = ?",
      [data_servico, ativo, id],
    );

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({
          message: "Agendamento não encontrado ou nenhuma alteração foi feita.",
          success: false,
        });
    }

    return res
      .status(200)
      .json({ message: "Agendamento atualizado com sucesso.", success: true });
  } catch (error) {
    console.error("Erro ao editar agendamento:", error);
    return res
      .status(500)
      .json({
        message: "Erro interno ao atualizar agendamento.",
        error: error.message,
      });
  }
};

const excluirAgenda = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await db.query(
      "UPDATE agendamento SET ativo = 0, data_finalizado = CURRENT_TIME() WHERE id_agendamento = ?",
      [id],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Agendamento não encontrado" });
    }

    res.json({ message: "Agendamento deletado com sucesso" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Erro ao deletar agendamento" });
  }
};

export { postAgenda, getAgenda, getAgendaById, editarAgenda, excluirAgenda };
