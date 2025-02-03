const express = require('express');
const mysql = require('mysql2/promise');
require('dotenv').config(); // Carrega as variáveis de ambiente do arquivo .env
const app = express();
const port = process.env.PORT || 3000; // Usa a porta definida no ambiente ou 3000

// Configuração da conexão com o banco de dados (use variáveis de ambiente para segurança!)
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'admin',
    database: process.env.DB_DATABASE || 'ta-pago',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});


// Middleware para tratamento de erros 404 (Not Found)
app.use((req, res, next) => {
  res.status(404).json({ error: "Recurso não encontrado" });
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});