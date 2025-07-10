import express, { json } from 'express';
import morgan from 'morgan';
import sequelize from './db.js';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './routes/routercontroller.js';

dotenv.config();

const app = express();
app.use(cors({
  origin: true, // Aceita qualquer origem
  credentials: true
}));
app.use(json());
app.use('/api/auth', router);
app.use(morgan('dev'));

// Realiza a conexão com o banco de dados
setTimeout(() => {
sequelize.authenticate()
    .then(() => {
        console.log('Conexão com o banco de dados estabelecida com sucesso.');
    })
    .catch(err => {
        console.error('Não foi possível conectar ao banco de dados:', err);
    });
}, 2000);
app.get('/teste', (req, res) => {
    res.send('Servidor Express rodando!');
});

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Servidor rodando na porta ${process.env.SERVER_PORT}`);
});