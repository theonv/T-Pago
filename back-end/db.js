require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.MARIADB_DATABASE,
    process.env.MARIADB_USER,
    process.env.MARIADB_PASSWORD, 
    {
        host: 'localhost',
        dialect: 'mariadb', 
        port: process.env.MARIADB_PORT,
    }
);

const Usuario = sequelize.define('usuarios', {
    nome: {
        type: Sequelize.TEXT
    },
    senha: {
        type: Sequelize.STRING(20),
        allowNull: false
    },
    email: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    }
}, {
    timestamps: false
});
// Cria a tabela se não existir
(async () => {
    await Usuario.sync();
    console.log('Tabela de usuários criada ou já existe.');
})();

module.exports = sequelize;