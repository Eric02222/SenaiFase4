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
                id: Number(id)
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
        const { nome, ano_modelo, ano_fabricacao, ativo } = req.body
        const marca = await prisma.marcas.create({
            data: {
                nome: nome,
                ano_modelo: ano_modelo,
                ano_fabricacao: ano_fabricacao,
                data_cadastro: new Date(),
                data_atualizacao: new Date(),
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
        const { id } = req.params;
        const { nome, ano_modelo, ano_fabricacao, ativo } = req.body;

        const marcaUpsert = await prisma.marcas.upsert({
            where: { id: Number(id) },
            update: {
                nome,
                ano_modelo,
                ano_fabricacao,
                data_atualizacao: new Date(),
                ativo
            },

            create: {
                nome,
                ano_modelo,
                ano_fabricacao,
                data_cadastro: new Date(),
                data_atualizacao: new Date(),
                ativo
            }
        });


        return res.status(200).json({
            message: "Marca processada com sucesso!",
            data: marcaUpsert
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
    console.log(`Tentando deletar por ID: ${id}`);

    try {
        const resultado = await prisma.marcas.delete({
            where: {
                id: Number(id),
            },
        });

        if (resultado.count === 0) {
            return res.status(404).json({
                message: "Nenhuma marca foi encontrada com os critérios informados."
            });
        }

        return res.status(200).json({
            message: `${resultado.count} marca(s) excluída(s) com sucesso!`,
            deletados: resultado.count
        });

    } catch (error) {
        console.error("Erro ao deletar marca:", error);

        return res.status(500).json({
            message: "Erro interno ao tentar excluir marca.",
            detalhes: error.message
        });
    }
}

export const deletarMarcaAbaixo2015 = async (req, res) => {
    const { nome } = req.params;
    console.log(`Tentando deletar modelos de ${nome} abaixo de 2015`);

    try {
        const resultado = await prisma.marcas.deleteMany({
            where: {
                nome: String(nome),
                ano_modelo: {
                    lt: "2015" 
                }
            },
        });

        if (resultado.count === 0) {
            return res.status(404).json({
                message: "Nenhuma marca abaixo de 2015 foi encontrada para este nome."
            });
        }

        return res.status(200).json({
            message: `${resultado.count} marca(s) excluída(s) com sucesso!`,
            deletados: resultado.count
        });

    } catch (error) {
        console.error("Erro ao deletar marca:", error);

        return res.status(500).json({
            message: "Erro interno ao tentar excluir marca.",
            detalhes: error.message
        });
    }
}

export const novaMarca = async (req, res) => {
    try {

        //A SINTAXI DE CRIAÇÃO É
        //PRISMA.NOME_TABELA.METODO_PRISMA
        const resultado = await prisma.marcas.createMany({
            data: [
                { nome: "Honda", ano_modelo: "2021", ano_fabricacao: "2020", data_cadastro: "10/05/2021", data_atualizacao: "16/07/2021", ativo: true },
                { nome: "Nissan", ano_modelo: "2016", ano_fabricacao: "2016", data_cadastro: "16/11/2016", data_atualizacao: "02/12/2016", ativo: false },
                { nome: "Chevrolet", ano_modelo: "2005", ano_fabricacao: "2005", data_cadastro: "06/10/2005", data_atualizacao: "18/02/2006", ativo: true },
                { nome: "Toyota", ano_modelo: "2022", ano_fabricacao: "2021", data_cadastro: "15/01/2022", data_atualizacao: "20/05/2023", ativo: true },
                { nome: "Volkswagen", ano_modelo: "2018", ano_fabricacao: "2018", data_cadastro: "03/03/2018", data_atualizacao: "10/11/2019", ativo: false },
                { nome: "Ford", ano_modelo: "2015", ano_fabricacao: "2014", data_cadastro: "12/08/2015", data_atualizacao: "05/09/2018", ativo: true },
                { nome: "Hyundai", ano_modelo: "2020", ano_fabricacao: "2020", data_cadastro: "22/02/2020", data_atualizacao: "01/04/2021", ativo: true },
                { nome: "Fiat", ano_modelo: "2010", ano_fabricacao: "2009", data_cadastro: "10/10/2010", data_atualizacao: "15/12/2012", ativo: false },
                { nome: "Jeep", ano_modelo: "2023", ano_fabricacao: "2023", data_cadastro: "05/06/2023", data_atualizacao: "10/01/2024", ativo: true },
                { nome: "Renault", ano_modelo: "2017", ano_fabricacao: "2016", data_cadastro: "25/04/2017", data_atualizacao: "30/08/2020", ativo: false },
                { nome: "Peugeot", ano_modelo: "2019", ano_fabricacao: "2019", data_cadastro: "14/07/2019", data_atualizacao: "21/03/2022", ativo: true },
                { nome: "BMW", ano_modelo: "2021", ano_fabricacao: "2020", data_cadastro: "08/09/2021", data_atualizacao: "12/12/2022", ativo: true },
                { nome: "Audi", ano_modelo: "2012", ano_fabricacao: "2011", data_cadastro: "18/05/2012", data_atualizacao: "09/07/2016", ativo: false }
            ]
        });

        return res.status(201).json({
            message: "Marcas cadastradas com sucesso!",
            marcasCriadas: resultado.count
        });

    } catch (error) {
        console.error("Erro ao cadastrar marcas:", error);

        return res.status(500).json({
            message: "Erro interno ao tentar cadastrar as marcas.",
            detalhes: error.message
        });
    }
}


