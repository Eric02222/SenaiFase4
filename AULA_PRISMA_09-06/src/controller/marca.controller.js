import { prisma } from "../../lib/prisma.js"

export const getTodasMarca = async (req, res) => {
    try {
        const marcas = await prisma.marcas.findMany();
        return res.json(marcas)
    }
    catch (e) {
        console.log(e)
    }
}

export const getMarcaPorId = async (req, res) => {
    try {
        const { id } = req.params
        const marca = await prisma.marcas.findUnique({
            where: {
                id: Number(params.id)
            }
        })
        if (!marca) return res.status(404).send("Marca não existe!")
        return res.json(marca)
    }
    catch (e) {
        console.log(e)
    }
}

export const criarMarca = async (req, res) => {
    try {
        const { nome, ano_modelo, ano_fabricacao, data_cadastro, data_atualizacao, ativo } = req.body
        const marca = await prisma.marcas.create({
            data: {
                nome: nome,
                ano_modelo: new Date(ano_modelo),
                ano_fabricacao: new Date(ano_fabricacao),
                data_cadastro: new Date(data_cadastro),
                data_atualizacao: new Date(data_atualizacao),
                ativo: ativo
            },
        })
        return res.status(201).json(marca)
    } catch (error) {
        console.error(error)
    }
}

export const atualizarMarca = async (req, res) => {
    try {
        const { body, params } = req;
        const { id, ...dadosParaSalvar } = body;

        if (Object.keys(dadosParaSalvar).length === 0) {
            return res.status(400).send("Nenhum dado válido para atualizar.");
        }

        await prisma.Marcas.update({
            where: { id: Number(params.id) },
            data: dadosParaSalvar
        });


        return res.status(200).json({
            message: "Marca atualizado!",
            data: usuarioAtualizado
        });

    } catch (error) {
        console.error("Erro no Update:", error);

        return res.status(500).json({
            message: "Erro interno ao atualizar.",
            erroDetalhado: error.message
        });
    }
}

export const deletarMarca = async (req, res) => {
    const { id } = req.params
    console.log("Tentando deletar marca por ID:", id);

    try {
        const marcaDeletado = await prisma.marcas.delete({
            where: {
                id: Number(id),
            },
        });

        return res.status(200).json({
            message: "Marca deletado com sucesso!",
            data: marcaDeletado
        });

    } catch (error) {
        console.error("Erro ao deletar usuário:", error);


        return res.status(500).json({
            message: "Erro interno ao tentar excluir marca.",
            detalhes: error.message
        });
    }
}



export const novaMarca = async (req, res) => {
    try {
        await prisma.marcas.createMany({
            where: {
                id: Number(id),
            },
        });

        return res.status(200).json({
            message: "Marca deletado com sucesso!",
            data: marcaDeletado
        });

    } catch (error) {
        console.error("Erro ao deletar usuário:", error);


        return res.status(500).json({
            message: "Erro interno ao tentar excluir marca.",
            detalhes: error.message
        });
    }
}


