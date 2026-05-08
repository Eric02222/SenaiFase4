import db from "../../config/db.js"

const getReservas = async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM reserva WHERE ativo = TRUE")

        return res.status(200).json({ success: true, data: rows })
    } catch (error) {
        return res.status(500).json({ message: "Erro ao buscar reservas", error: error.message })
    }
}

const getReservaById = async (req, res) => {
    try {
        const { id } = req.params

        const [rows] = await db.query("SELECT * FROM reserva WHERE id_reserva = ?", [id])

        if (rows.length === 0) {
            return res.status(404).json({ message: "Não foi possivel encontrar a reserva", success: false })
        }

        return res.status(200).json({ success: true, data: rows })
    } catch (error) {

    }
}

const getHistoricoReservas = async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM reserva WHERE ativo = FALSE")

        return res.status(200).json({ success: true, data: rows })
    } catch (error) {
        return res.status(500).json({ message: "Erro ao buscar reservas", error: error.message })
    }
}

const postReserva = async (req, res) => {
    try {
        const { data_reserva_inicio, data_reserva_fim, quarto_id, cliente_id } = req.body;

        const [result] = await db.query("INSERT INTO reserva (data_reserva_inicio, data_reserva_fim, quarto_id, cliente_id) VALUES (?, ?, ?, ?)", [data_reserva_inicio, data_reserva_fim, quarto_id, cliente_id]);

        if (result.affectedRows === 0) {
            return res.status(400).json({ message: "Não foi possivel inserir o reserva", success: false })
        }

        await db.query("UPDATE quarto SET disponivel = FALSE WHERE id_quarto = ?",
            [quarto_id]);

        return res.status(200).json({ message: "Reserva Criado com sucesso", success: true })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Não foi possivel criar o reserva", error: error })
    }
}

const putReserva = async (req, res) => {
    try {
        const { id } = req.params
        const { data_reserva_inicio, data_reserva_fim, quarto_id } = req.body;

        if (!id) {
            return res.status(400).json({ message: "O ID do reserva é obrigatório.", success: false });
        }

        const [result] = await db.query("UPDATE reserva SET data_reserva_inicio = ?, data_reserva_fim = ?, quarto_id = ?, data_editado = CURRENT_TIMESTAMP() WHERE id_reserva = ?",
            [data_reserva_inicio, data_reserva_fim, quarto_id, id]);

        if (result.affectedRows === 0) {
            return res.status(400).json({ message: "Não foi possivel atuaizar o Reserva", success: false })
        }

        return res.status(200).json({ message: "Reserva atualizado com sucesso", success: true })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Não foi possivel atualizar o reserva", error: error })
    }
}

const deleteReserva = async (req, res) => {
    try {
        const { id } = req.params

        const [rows] = await db.query("SELECT * FROM reserva WHERE id_reserva = ?", [id])

        const quarto_id = rows.quarto_id

        if (!id) {
            return res.status(400).json({ message: "O ID do reserva é obrigatório.", success: false });
        }

        const [result] = await db.query("UPDATE reserva SET data_excluido = CURRENT_TIMESTAMP(), ativo = FALSE WHERE id_reserva = ?", [id]);

        if (result.affectedRows === 0) {
            return res.status(400).json({ message: "Não foi possivel atuaizar o reserva", success: false })
        }

        await db.query("UPDATE quarto SET disponivel = TRUE WHERE id_quarto = ?",
            [quarto_id]);

        return res.status(200).json({ message: "Reserva atualizado com sucesso", success: true })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Não foi possivel deletar o reserva", error: error })
    }
}

export { getReservas, getReservaById, postReserva, getHistoricoReservas, putReserva, deleteReserva }