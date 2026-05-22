import database from "../config/database.js";

export const novoMedicamento = async (req, res) => {
    try {

        const {nome, tipo, dosagem, marca, quantidade, estoque_minimo} = req.body;


        // VALIDAÇÕES
        if (!nome || nome.trim() === "") {
            return res.status(400).json({success: false, message: "Informe o nome do medicamento."});
        }

        if (!tipo || tipo.trim() === "") {
            return res.status(400).json({success: false, message: "Informe o tipo do medicamento."});
        }

        if (!dosagem || dosagem.trim() === "") {
            return res.status(400).json({success: false, message: "Informe a dosagem."});
        }

        if (!marca || marca.trim() === "") {
            return res.status(400).json({success: false, message: "Informe a marca."});
        }

        if (quantidade == null || quantidade < 0) {
            return res.status(400).json({success: false, message: "Quantidade inválida."});
        }

        if (estoque_minimo == null || estoque_minimo < 0) {
            return res.status(400).json({success: false, message: "Estoque mínimo inválido."});
        }

        // VERIFICA SE JÁ EXISTE
        const [medicamentoExistente] = await database.query(
            `SELECT id FROM medicamento WHERE nome = ? AND dosagem = ? AND marca = ?`,
            [nome, dosagem, marca]
        );

        if (medicamentoExistente.length > 0) {
            return res.status(400).json({success: false, message: "Medicamento já cadastrado." });
        }

        const [resultado] = await database.query(
            `INSERT INTO medicamento( nome, tipo, dosagem, marca, quantidade, estoque_minimo) VALUES (?, ?, ?, ?, ?, ?)`,
            [nome, tipo, dosagem, marca, quantidade, estoque_minimo
            ]
        );

        return res.status(201).json({
            success: true,
            message: "Medicamento cadastrado com sucesso.",
            id: resultado.insertId
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Erro ao cadastrar medicamento."
        });
    }
}

export const editaMedicamento = async (req, res) => {
    try {

        const { id } = req.params;

        const { nome, tipo, dosagem, marca, quantidade, estoque_minimo} = req.body;

        // VERIFICA SE EXISTE
        const [medicamento] = await database.query(
            `SELECT id FROM medicamento WHERE id = ?`, [id]);

        if (medicamento.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Medicamento não encontrado."
            });
        }

        // VALIDAÇÕES
        if (!nome || nome.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Informe o nome do medicamento."
            });
        }

        if (!tipo || tipo.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Informe o tipo do medicamento."
            });
        }

        if (!dosagem || dosagem.trim() === "") {
            return res.status(400).json({success: false, message: "Informe a dosagem."});
        }

        if (!marca || marca.trim() === "") {
            return res.status(400).json({success: false, message: "Informe a marca."});
        }

        if (quantidade == null || quantidade < 0) {
            return res.status(400).json({success: false, message: "Quantidade inválida."});
        }

        if (estoque_minimo == null || estoque_minimo < 0) {
            return res.status(400).json({success: false, message: "Estoque mínimo inválido."});
        }

        // ATUALIZA
        await database.query(
            `UPDATE medicamento SET nome = ?, tipo = ?, dosagem = ?, marca = ?, quantidade = ?, estoque_minimo = ? WHERE id = ? `,
            [nome, tipo, dosagem, marca, quantidade, estoque_minimo, id]
        );

        return res.status(200).json({success: true, message: "Medicamento atualizado com sucesso."});

    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Erro ao editar medicamento."});
    }
}

export const excluiMedicamento = async (req, res) => {
    try {
        const id = req.params;

        if (id <= 0) {
            return res.status(400).json({ message: "Medicamento não encontrado", success: false })
        }

        const [rows] = await database.query("DELETE FROM medicamento WHERE id = ?", [id]);

        if (rows.affectRows == 0) {
            return res.status(400).json({ messagem: "Não foi possivel excluir este medicamento", success: false })
        }

        return res.status(200).json({ message: " Medicamento excluido com sucesso", success: true })
    } catch (error) {
        return res.status(500).json({ messagem: "Erro ao excluir medicamento, algo aconteceu!", success: false })

    }
}

export const mostraMedicamentos = async (req, res) => {
    try {
        const [rows] = await database.query("SELECT * FROM medicamento")

        if (rows.length == 0) {
            return res.status(400).json({ message: "Nenhum medicamento encontrado", success: false })
        }
        return res.status(200).json({ message: "Medicamento mostrado", success: true, data: rows })

    } catch (error) {
        return res.status(400).json({ success: false, error: error.message })

    }
}