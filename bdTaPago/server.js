require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { db } = require('../backend/config/database');

// Importar rotas
const authRoutes = require('../backend/routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'projeto')));

// Rotas da API
app.use('/api/auth', authRoutes);

// Rota para a página inicial
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'projeto', 'Páginas', 'index.html'));
});

// Rota para todas as outras páginas HTML
app.get('/:page', (req, res) => {
  const page = req.params.page;
  res.sendFile(path.join(__dirname, 'projeto', 'Páginas', `${page}.html`));
});

// Iniciar o servidor
async function startServer() {
  try {
    await db.sync({force: false});
    await db.authenticate();
    console.debug('Conexão com o banco de dados estabelecida com sucesso.');
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error('Erro ao conectar com o banco de dados:', error);
  }
}

startServer();