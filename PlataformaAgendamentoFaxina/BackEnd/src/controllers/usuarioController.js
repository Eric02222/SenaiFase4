const bcrypt = require('bcrypt');
import prismaClient from '../../prisma/prisma.js';

class UsuarioController {
    constructor() { }

    async createUser(req, res) {
        try {
            const { nome, email, senha, cpf } = req.body;
            if (nome === "") {
                return res.status(400).json({ message: "O campo do nome deve ser preenchido" })
            }

            if (email === "" || email.length < 5) {
                return res.status(400).json({ message: "O campo do email deve ser preenchido. Deve conter ao menos 5 caracteres" })
            }

            if (senha === "" || senha.length < 6) {
                return res.status(400).json({ message: "O campo do senha deve ser preenchido e deve conter ao menos 8 caracteres." })
            }

            if (cpf === "" || cpf.length < 11) {
                return res.status(400).json({ message: "O campo do Cpf deve ser preenchido corretamente e não pode estar vazio." })
            }

            const saltRounds = 10;
            const hashParssword = await bcrypt.hash(senha, saltRounds);

            const [result] = await prismaClient.usuario.create({
                data: { nome: nome, email: email, senha: hashParssword, cpf: cpf },
                select: {
                    id: true,
                    nome: true,
                    email: true,
                    senha: true,
                    cpf: true
                },
            });

            if (result.affectedRows === 0) {
                return res.status(400).json({ message: "Não foi possível criar o usuário." })
            }

            return res.status(201).json({ message: "Usuario criado com sucesso." })
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao criar usuário.', error: error.message });
        }
    }

    async forgotPassword(req, res) {
        try {
            const email = req.body.email
            const senha = req.body.novaSenha
            const confirmar_senha = req.body.confirmarSenha

            if (email === "") {
                return res.status(400).json({ message: "Email não deve estar vazio. Ele é obrigatório." })
            }

            if (senha === "") {
                return res.status(400).json({ message: "Senha não deve estar vazio. Ela é obrigatório." })
            } else {
                if (senha.length < 6 || senha.length > 12) {
                    return res.status(400).json({ message: "A senha deve somente de 6 a 12 caracteres." })

                };
            };

            if (confirmar_senha === "") {
                return res.status(400).json({ message: "O campo confirmar senha é obrigatório. Não deve estar vazio." })
            } else {
                if (confirmar_senha !== senha) {
                    return res.status(400).json({ message: "O campo confirmar senha não é igual a senha. Tente novamente." })
                };
                const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,12}$/;

                if (!regex.test(senha)) {
                    return res.status(400).json({ message: "A senha não corresponde as regras impostas para uma senha forte" })
                };
            };

            const [row] = await prismaClient.usuario.findUnique({ where: { email } })

            if (row.length === 0) {
                return res.status(400).json({ message: "Esse ussuário não foi encontrado" })
            }

            const user = row[0];

            const saltRound = 10;
            const hashPassword = await bcrypt.hash(senha, saltRound)

            const [result] = await prismaClient.usuario.update({
                where: { id: Number(user.id) },
                data:
                {
                    senha: hashPassword
                }
            });

            if (result.affectedRows === 0) {
                return res.status(400).json({ message: "Não foi possivel resetar a sua senha. Tente novamente." })
            }

            return res.status(201).json({ message: "Senha atualizada com sucesso" })
        } catch (error) {
            return res.status(500).json({ message: "Erro ao criar usuario", error: error.message })
        }
    }

}

export const usuarioController = new UsuarioController();