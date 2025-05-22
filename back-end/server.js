const express = require('express');
const morgan = require('morgan');
const sequelize = require('./db');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(morgan('dev'));

// Realiza a conexão com o banco de dados
sequelize.authenticate()
    .then(() => {
        console.log('Conexão com o banco de dados estabelecida com sucesso.');
    })
    .catch(err => {
        console.error('Não foi possível conectar ao banco de dados:', err);
    });

app.get('/teste', (req, res) => {
    res.send('Servidor Express rodando!');
});

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Servidor rodando na porta ${process.env.SERVER_PORT}`);
});