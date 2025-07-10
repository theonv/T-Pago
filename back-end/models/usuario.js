import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

const User = sequelize.define('usuario', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING(40),
        allowNull: true
    },
    tema: {
        type: DataTypes.STRING(10),
        allowNull: true
    },
    notificacoes: {
        type: DataTypes.STRING(1),
        allowNull: true
    },
    hora_notificacao: {
        type: DataTypes.STRING(10),
        allowNull: true
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    senha: {
        type: DataTypes.STRING(100),
        allowNull: false
    }
}, {
    timestamps: false
});

(async () => {
    await User.sync({ alter: true });
    console.log('Tabela de usuários criada ou já existe.');
})();
export default User;