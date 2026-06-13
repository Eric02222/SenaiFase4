import database from "../config/database.js";

export const novoAgendamento = async (req, res) => {
    try {
        const { paciente_nome, medico_id, data_hora } = req.body;

        if (!paciente_nome || !medico_id || !data_hora) {
            return res.status(400).json({
                success: false,
                message: "Preencha todos os campos (paciente_nome, medico_id, data_hora)."
            });
        }

        // Check if doctor is already booked at that time
        const [conflito] = await database.query(
            "SELECT * FROM agendamento WHERE medico_id = ? AND data_hora = ?",
            [medico_id, data_hora]
        );

        if (conflito.length > 0) {
            return res.status(400).json({
                success: false,
                message: "O médico já possui uma consulta agendada para este horário."
            });
        }

        const [resultado] = await database.query(
            "INSERT INTO agendamento (paciente_nome, medico_id, data_hora) VALUES (?, ?, ?)",
            [paciente_nome, medico_id, data_hora]
        );

        return res.status(201).json({
            success: true,
            message: "Agendamento realizado com sucesso.",
            id: resultado.insertId
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Erro ao realizar agendamento.",
            error: error.message
        });
    }
}

export const listarAgendamentos = async (req, res) => {
    try {
        const [rows] = await database.query(`
            SELECT a.*, u.nome as medico_nome 
            FROM agendamento a
            JOIN usuario u ON a.medico_id = u.id
        `);
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ success: false, message: "Erro ao listar agendamentos.", error: error.message });
    }
}

export const deletarAgendamento = async (req, res) => {
    try {
        const { id } = req.params;
        await database.query("DELETE FROM agendamento WHERE id = ?", [id]);
        res.status(200).json({ success: true, message: "Agendamento deletado com sucesso." });
    } catch (error) {
        res.status(500).json({ success: false, message: "Erro ao deletar agendamento.", error: error.message });
    }
}

export const atualizarAgendamento = async (req, res) => {
    try {
        const { id } = req.params;
        const { paciente_nome, medico_id, data_hora } = req.body;

        // Check for conflicts excluding current agendamento
        const [conflito] = await database.query(
            "SELECT * FROM agendamento WHERE medico_id = ? AND data_hora = ? AND id != ?",
            [medico_id, data_hora, id]
        );

        if (conflito.length > 0) {
            return res.status(400).json({
                success: false,
                message: "O médico já possui uma consulta agendada para este horário."
            });
        }

        await database.query(
            "UPDATE agendamento SET paciente_nome = ?, medico_id = ?, data_hora = ? WHERE id = ?",
            [paciente_nome, medico_id, data_hora, id]
        );

        res.status(200).json({ success: true, message: "Agendamento atualizado com sucesso." });
    } catch (error) {
        res.status(500).json({ success: false, message: "Erro ao atualizar agendamento.", error: error.message });
    }
}
