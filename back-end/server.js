const express = require('express');
const morgan = require('morgan');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(morgan('dev'));

app.get('/teste', (res) => {
    res.send('Servidor Express rodando!');
});

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Servidor rodando na porta ${process.env.SERVER_PORT}`);
});