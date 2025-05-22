import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

const Usuario = sequelize.define('usuarios', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: DataTypes.TEXT
    },
    senha: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false
    }
}, {
    timestamps: false
});

// Exemplo de uso para criar a tabela
(async () => {
    await Usuario.sync();
    console.log('Tabela de usuários criada ou já existe.');
})();

export default Usuario;