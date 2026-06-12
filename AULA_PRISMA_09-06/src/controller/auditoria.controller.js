import { prisma } from "../../lib/prisma.js"


export const criarUsuarioComAuditoria = async (req, res) => {
    const { name, email, quemRealizou } = req.body;

    try {
        const novoUsuario = await prisma.$transaction(async (tx) => {
            const user = await tx.user.create({
                data: { name, email }
            });

            const auditLog = await tx.auditLog.create({
                data: {
                    entity: "User",
                    entityId: String(user.id),
                    action: "CREATE",
                    oldData: null,
                    newData: user,
                    performedBy: quemRealizou || "Sistema"
                }
            });

            return auditLog;
        });

        return res.status(201).json({
            entity: novoUsuario.entity,
            entityId: novoUsuario.entityId,
            action: novoUsuario.action,
            oldData: novoUsuario.oldData,
            newData: novoUsuario.newData
        });

    } catch (error) {
        console.error("Erro ao criar usuário:", error);
        return res.status(500).json({ error: "Erro interno do servidor" });
    }
};

export const atualizarUsuarioComAuditoria = async (req, res) => {
    const { id } = req.params;
    const { name, email, quemRealizou } = req.body;

    try {
        const usuarioAtualizado = await prisma.$transaction(async (tx) => {
            const dadosAntigos = await tx.user.findUnique({
                where: { id: Number(id) }
            });

            if (!dadosAntigos) throw new Error("Usuário não encontrado.");

            const user = await tx.user.update({
                where: { id: Number(id) },
                data: { name, email }
            });

             const auditLog = await tx.auditLog.create({
                data: {
                    entity: "User",
                    entityId: String(id),
                    action: "UPDATE",
                    oldData: dadosAntigos,
                    newData: user,
                    performedBy: quemRealizou || "Sistema"
                }
            });

            return auditLog;
        });

        return res.status(200).json({
            action: usuarioAtualizado.action,
            oldData: usuarioAtualizado.oldData,
            newData: usuarioAtualizado.newData
        });

    } catch (error) {
        if (error.message === "Usuário não encontrado.") {
            return res.status(404).json({ error: error.message });
        }
        console.error("Erro ao atualizar usuário:", error);
        return res.status(500).json({ error: "Erro interno do servidor" });
    }
};

export const deletarUsuarioComAuditoria = async (req, res) => {
    const { id } = req.params;
    const { quemRealizou } = req.body;

    try {
        const usuariosDeletado = await prisma.$transaction(async (tx) => {
            const dadosAntigos = await tx.user.findUnique({
                where: { id: Number(id) }
            });

            if (!dadosAntigos) throw new Error("Usuário não encontrado.");

            await tx.user.delete({
                where: { id: Number(id) }
            });

            const auditLog = await tx.auditLog.create({
                data: {
                    entity: "User",
                    entityId: String(id),
                    action: "DELETE",
                    oldData: dadosAntigos,
                    newData: null,
                    performedBy: quemRealizou || "Sistema"
                }
            });
            return auditLog;
        });

        return res.status(200).json({
            action: usuariosDeletado.action,
            oldData: usuariosDeletado.oldData,
            newData: usuariosDeletado.newData
        });

    } catch (error) {
        if (error.message === "Usuário não encontrado.") {
            return res.status(404).json({ error: error.message });
        }
        console.error("Erro ao excluir usuário:", error);
        return res.status(500).json({ error: "Erro interno do servidor" });
    }
};