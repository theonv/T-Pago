import express, { json } from 'express';
import morgan from 'morgan';
import sequelize from './db.js';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './routes/routercontroller.js';

import User from './models/usuario.js';
import Task from './models/task.js';
import List from './models/lists.js';

dotenv.config();

const app = express();
app.use(cors({
  origin: true, // Aceita qualquer origem
  credentials: true
}));
app.use(json());
app.use('/api/auth', router);
app.use(morgan('dev'));

// Realiza a conexão com o banco de dados e sincroniza as tabelas na ordem correta
setTimeout(async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexão com o banco de dados estabelecida com sucesso.');
        // Ordem: User -> Task -> List
        await User.sync({ alter: true });
        console.log('Tabela de usuários criada ou já existe.');
        await Task.sync({ alter: true });
        console.log('Tabela de tarefas criada ou já existe.');
        await List.sync({ alter: true });
        console.log('Tabela de listas criada ou já existe.');
    } catch (err) {
        console.error('Erro ao sincronizar tabelas ou conectar ao banco de dados:', err);
    }
}, 2000);
app.get('/', (req, res) => {
    res.send('Servidor Express rodando!');
});

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Servidor rodando na porta ${process.env.SERVER_PORT}`);
});