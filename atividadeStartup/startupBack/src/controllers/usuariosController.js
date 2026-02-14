import db from "../config/db.js";

class UsuariosController {
  constructor() {}

  // Controller para pegar todos os usuários
  async getTodosUsuarios(req, res) {
    try {
      const [rows] = await db.query("SELECT * FROM usuario");
      return res.json(rows);
    } catch (e) {
      console.error("Erro em getTodosUsuarios:", e);
      res.status(500).json({ error: "Erro ao buscar usuários" });
    }
  }

  // Controller para pegar usuário por ID
  async getUsuarioPorId(req, res) {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({ error: "ID do usuário inválido." });
    }

    try {
      const [rows] = await db.query(
        "SELECT * FROM usuario WHERE id_usuario = ?",
        [id]
      );

      if (rows.length === 0) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }
      res.json(rows[0]);
    } catch (e) {
      console.error("Erro em getUsuarioPorId:", e);
      res.status(500).json({ error: "Erro ao buscar usuário" });
    }
  }

  // Controller para criar usuário
  async postUsuario(req, res) {
    const { nome, email, senha } = req.body;
    
    try {
      const [result] = await db.query(
        "INSERT INTO usuario (nome, email, senha) VALUES (?, ?, ?)",
        [nome, email, senha]
      );
      
      const [novoUsuario] = await db.query(
        "SELECT * FROM usuario WHERE id_usuario = ?",
        [result.insertId]
      );
      
      res.status(201).json(novoUsuario[0]);
    } catch (e) {
      console.error("Erro em postUsuario:", e);
      res.status(500).json({ error: "Erro ao adicionar usuário" });
    }
  }

  // Controller para atualizar usuário
  async putUsuario(req, res) {
    const { id } = req.params;
    const { nome, email, senha } = req.body;
    
    try {
      const [result] = await db.query(
        "UPDATE usuario SET nome = ?, email = ?, senha = ? WHERE id_usuario = ?",
        [nome, email, senha, id] 
      );
      
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }
      
      const [usuarioAtualizado] = await db.query(
        "SELECT * FROM usuario WHERE id_usuario = ?",
        [id]
      );
      
      res.status(200).json(usuarioAtualizado[0]);
    } catch (e) {
      console.error("Erro em putUsuario:", e);
      res.status(500).json({ error: "Erro ao atualizar usuário" });
    }
  }

  // Controller para deletar usuário
  async deleteUsuario(req, res) { 
    const { id } = req.params;
    
    try {
      const [result] = await db.query(
        "DELETE FROM usuario WHERE id_usuario = ?",
        [id]
      );
      
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }
      
      res.json({ message: "Usuário deletado com sucesso" });
    } catch (err) {
      console.error("Erro em deleteUsuario:", err);
      res.status(500).json({ error: "Erro ao deletar usuário" });
    }
  }
}

export const usuariosController = new UsuariosController();