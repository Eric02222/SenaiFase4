import mysql from "mysql2/promise"

export const db = mysql.createPool({
    host: process.env.DATABASE_HOST ?? "localhost",
    user: process.env.DATABASE_USER ?? "root",
    password: process.env.DATABASE_PASSWORD ?? "senai",
    port: process.env.DATABASE_PORT ?? "3306",
    database: process.env.DATABASE_NAME ?? "token_db",


})

// criar as tabelas no banco se não existir
await db.query(`
    CREATE TABLE IF NOT EXISTS usuarios (
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(150) NOT NULL,
        senha VARCHAR(255) NOT NULL
    )
`) // Removed the trailing comma after NOT NULL

await db.query(`
    CREATE TABLE IF NOT EXISTS refresh_tokens (
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        token VARCHAR(512) NOT NULL UNIQUE,
        usuario_id INT,
        expira_em DATETIME,
        criado_em DATETIME DEFAULT CURRENT_TIMESTAMP
    )
`)