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
  origin: true,
  credentials: true
}));
app.use(json());
app.use('/api/auth', router);
app.use(morgan('dev'));

setTimeout(async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexão com o banco de dados estabelecida com sucesso.');
        await List.drop();
        await Task.drop();
        await User.drop();
        // Ordem: User -> Task -> List
        await User.sync({ force: true });
        console.log('Tabela de usuários sincronizada.');
        await Task.sync({ force: true });
        console.log('Tabela de tarefas sincronizada.');
        await List.sync({ force: true });
        console.log('Tabela de listas sincronizada.');
        
        console.log('✅ Todas as tabelas sincronizadas com sucesso!');
    } catch (err) {
        console.error('❌ Erro ao sincronizar tabelas ou conectar ao banco de dados:', err);
    }
}, 2000);

app.get('/', (req, res) => {
    res.send('Servidor Express rodando!');
});

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Servidor rodando na porta ${process.env.SERVER_PORT}`);
});