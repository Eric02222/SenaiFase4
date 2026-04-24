import mysql from "mysql2/promise"
import dotenv from "dotenv"

dotenv.config()

const db = mysql.createPool({
    host: "root",
    password: "senai",
    user: "root",
    database: "agendamento_faxina"
})

export default db; 