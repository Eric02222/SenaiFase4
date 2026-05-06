import db from "../../config/db.js"

const getQuartos = async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM quarto WHERE disponivel = TRUE")

        return res.status(200).json({ success: true, data: rows })
    } catch (error) {
        return res.status(500).json({ message: "Erro ao buscar quartos", error: error.message })
    }
}

const getQuartosById = async (req, res) => {
    try {
        const { id } = req.params

        const [rows] = await db.query("SELECT * FROM quarto WHERE id_quarto = ?", [id])

        if (rows.length === 0) {
            return res.status(404).json({ message: "Não foi possivel encontrar o quarto", success: false })
        }

        return res.status(200).json({ success: true, data: rows })
    } catch (error) {

    }
}

const postQuarto = async (req, res) => {
    try {
        const { numero_quarto, capacidade_hospedes, tipo_quarto, preco } = req.body;

        const [result] = await db.query("INSERT INTO quarto (numero_quarto, capacidade_hospedes, tipo_quarto, preco) VALUES (?, ?, ?, ?)", [numero_quarto, capacidade_hospedes, tipo_quarto, preco]);

        if (result.affectedRows === 0) {
            return res.status(400).json({ message: "Não foi possivel inserir o quarto", success: false })
        }

        return res.status(200).json({ message: "Quarto Criado com sucesso", success: true })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Não foi possivel criar o quarto", error: error })
    }
}

const putQuarto = async (req, res) => {
    try {
        const { id } = req.params
        const { numero_quarto, capacidade_hospedes, tipo_quarto, preco } = req.body;


        if (!id) {
            return res.status(400).json({ message: "O ID do quarto é obrigatório.", success: false });
        }

        const [result] = await db.query("UPDATE quarto SET numero_quarto = ?, capacidade_hospedes = ?, tipo_quarto = ?, preco = ? WHERE id_quarto = ?",
            [numero_quarto, capacidade_hospedes, tipo_quarto, preco, id]);

        if (result.affectedRows === 0) {
            return res.status(400).json({ message: "Não foi possivel atuaizar o quarto", success: false })
        }

        return res.status(200).json({ message: "Quarto atualizado com sucesso", success: true })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Não foi possivel atualizar o quarto", error: error })
    }
}

const deleteQuarto = async (req, res) => {
    try {
        const { id } = req.params

        if (!id) {
            return res.status(400).json({ message: "O ID do quarto é obrigatório.", success: false });
        }

        const [result] = await db.query("DELETE FROM quarto WHERE id_quarto = ?", [id])

        if (result.affectedRows === 0) {
            return res.status(400).json({ message: "Não foi possivel deletar o quarto", success: false })
        }

        return res.status(200).json({ message: "Quarto deletado com sucesso", success: true })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Não foi possivel deletar o quarto", error: error })
    }
}

export { getQuartos, getQuartosById, postQuarto, putQuarto, deleteQuarto }