import database from "../config/database.js";

export const novaMovimentacao = async (req, res) => {
    try {

        const { data_adicionado, nome_medicamento, tipo_medicamento, dosagem_medicamento, marca_medicamento, quantidade_medicamento } = req.body;


        // VALIDAÇÕES
        if (!nome_medicamento || nome_medicamento.trim() === "") {
            return res.status(400).json({ success: false, message: "Informe o nome do medicamento." });
        }

        if (!tipo_medicamento || tipo_medicamento.trim() === "") {
            return res.status(400).json({ success: false, message: "Informe o tipo do medicamento." });
        }

        if (!dosagem_medicamento || dosagem_medicamento.trim() === "") {
            return res.status(400).json({ success: false, message: "Informe a dosagem." });
        }

        if (!marca_medicamento || marca_medicamento.trim() === "") {
            return res.status(400).json({ success: false, message: "Informe a marca." });
        }

        if (quantidade_medicamento == null || quantidade_medicamento < 0) {
            return res.status(400).json({ success: false, message: "Quantidade inválida." });
        }

        // VERIFICA SE JÁ EXISTE
        const [movimentacaoExistente] = await database.query(
            `SELECT id FROM movimentacao WHERE nome_medicamento = ? AND dosagem_medicamento = ? AND marca_medicamento = ?`,
            [nome_medicamento, dosagem_medicamento, marca_medicamento]
        );

        if (movimentacaoExistente.length > 0) {
            return res.status(400).json({ success: false, message: "Movimentação já cadastrada." });
        }

        await database.query(
            `INSERT INTO movimentacao( data_adicionado, nome_medicamento, tipo_medicamento, dosagem_medicamento, marca_medicamento, quantidade_medicamento) VALUES (CURRENT_TIMESTAMP(), ?, ?, ?, ?, ?)`,
            [nome_medicamento, tipo_medicamento, dosagem_medicamento, marca_medicamento, quantidade_medicamento]
        );

        return res.status(201).json({
            success: true,
            message: "Movimentação cadastrada com sucesso.",
            id: resultado.insertId
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Erro ao cadastrar movimentação."
        });
    }
}

export const editaMovimentacao = async (req, res) => {
    try {

        const { id } = req.params;

        const { data_edicao, nome_medicamento, tipo_medicamento, dosagem_medicamento, marca_medicamento, quantidade_medicamento} = req.body;

        // VERIFICA SE EXISTE
        const [movimentacao] = await database.query(
            `SELECT id FROM movimentacao WHERE id = ?`, [id]);

        if (movimentacao.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Movimentação não encontrada."
            });
        }

        // VALIDAÇÕES
        if (!nome_medicamento || nome_medicamento.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Informe o nome do medicamento."
            });
        }

        if (!tipo_medicamento || tipo_medicamento.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Informe o tipo do medicamento."
            });
        }

        if (!dosagem_medicamento || dosagem_medicamento.trim() === "") {
            return res.status(400).json({ success: false, message: "Informe a dosagem." });
        }

        if (!marca_medicamento || marca_medicamento.trim() === "") {
            return res.status(400).json({ success: false, message: "Informe a marca." });
        }

        if (quantidade_medicamento == null || quantidade_medicamento < 0) {
            return res.status(400).json({ success: false, message: "Quantidade inválida." });
        }


        // ATUALIZA
        await database.query(
            `UPDATE movimentacao SET data_edicao = ?, nome_medicamento = ?, tipo_medicamento = ?, dosagem_medicamento = ?, marca_medicamento = ?, quantidade_medicamento = ? WHERE id = ? `,
            [new Date(), nome_medicamento, tipo_medicamento, dosagem_medicamento, marca_medicamento, quantidade_medicamento, id]
        );

        await database.query(
            `INSERT INTO movimentacao( data_edicao, nome_medicamento, tipo_medicamento, dosagem_medicamento, marca_medicamento, quantidade_medicamento) VALUES (CURRENT_TIMESTAMP(), ?, ?, ?, ?, ?, )`,
            [nome_medicamento, tipo_medicamento, dosagem_medicamento, marca_medicamento, quantidade_medicamento]
        );

        return res.status(200).json({ success: true, message: "Movimentação atualizado com sucesso." });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Erro ao editar Movimentação." });
    }
}

export const excluiMovimentacao = async (req, res) => {
    try {
        const id = req.params;

        if (id <= 0) {
            return res.status(400).json({ message: "Movimentação não encontrado", success: false })
        }

        const [rows] = await database.query("DELETE FROM movimentacao WHERE id = ?", [id]);

        if (rows.affectRows == 0) {
            return res.status(400).json({ messagem: "Não foi possivel excluir esta movimentação", success: false })
        }


        return res.status(200).json({ message: " Movimentação excluida com sucesso", success: true })
    } catch (error) {
        return res.status(500).json({ messagem: "Erro ao excluir movimentação, algo aconteceu!", success: false })

    }
}

export const mostraMovimentacoes = async (req, res) => {
    try {
        const [rows] = await database.query("SELECT * FROM movimentacao")

        if (rows.length == 0) {
            return res.status(400).json({ message: "Nenhum movimentação encontrado", success: false })
        }
        return res.status(200).json({ message: "Movimentação mostrada", success: true, data: rows })

    } catch (error) {
        return res.status(400).json({ success: false, error: error.message })

    }
}