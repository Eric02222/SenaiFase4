import mysql from 'mysql2/promise';

const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',      
    password: '861391',    
    database: 'cleanMatch',
    port: 3307,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = db;