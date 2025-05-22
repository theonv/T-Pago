require('dotenv').config();
const { Sequelize } = require('sequelize');

// Substitua pelos seus dados de conexão
const sequelize = new Sequelize(
    process.env.MARIADB_DATABASE,
    process.env.MARIADB_USER,
    process.env.MARIADB_PASSWORD, 
    {
    host: 'localhost',
    dialect: 'mariadb', 
    port: process.env.MARIADB_PORT,
});

async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('Conexão estabelecida com sucesso.');
    } catch (error) {
        console.error('Não foi possível conectar ao banco de dados:', error);
    }
}

testConnection();

module.exports = sequelize;