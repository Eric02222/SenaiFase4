const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
import prismaClient from '../../prisma/prisma.js';

class AgendamentoController {
    constructor() { }

    async getAgendamentos(req, res) {
        try {
            const rows = await prismaClient.agenda.findMany()
            return res.status(200).json({ success: true, data: rows });
        } catch (error) {
            console.error("Erro ao buscar usuários:", error);
            return res.status(500).json({ message: "Erro ao buscar usuários", error: error.message });
        }
    }

    async postAgendamento(req, res) {
        try {
            const { data, endereco, tipoServico } = req.body;

            if (!data || !endereco || !tipoServico) {
                return res.status(400).json({ message: "Preencha todos os campos." });
            }

            const [result] = await prismaClient.agenda.create({
                data: { data: data, endereco: endereco, tipoServico: tipoServico },
                select: {
                    id: true,
                    data: true,
                    endereco: true,
                    tipoServico: true,
                },
            });

            if (result.affectedRows === 0) {
                return res.status(400).json({ message: "Não foi possível criar o agendamento." })
            }

            return res.status(201).json({ message: "Agendamento criado com sucesso." })

        } catch (error) {
            res.status(500).json({ message: 'Erro ao realizar agendamento.', error: error.message });
        }
    }

    //finalizar patch
    async patchAgendamento(req, res) {
        try {
            const { data, endereco, tipoServico } = req.body;

            if (!data || !endereco || !tipoServico) {
                return res.status(400).json({ message: "Preencha todos os campos." });
            }

            const [result] = await prismaClient.agenda.create({
                data: { data: data, endereco: endereco, tipoServico: tipoServico },
                select: {
                    id: true,
                    data: true,
                    endereco: true,
                    tipoServico: true,
                },
            });

            if (result.affectedRows === 0) {
                return res.status(400).json({ message: "Não foi possível criar o agendamento." })
            }

            return res.status(201).json({ message: "Agendamento criado com sucesso." })

        } catch (error) {
            res.status(500).json({ message: 'Erro ao realizar agendamento.', error: error.message });
        }
    }



}

export const loginController = new AgendamentoController();