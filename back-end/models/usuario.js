import { DataTypes } from 'sequelize';
import sequelize from '../db.js';


const Usuario = sequelize.define('usuario', {
    id_usuario: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING(40),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    senha: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    data_cadastro: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    id: {
        type: DataTypes.INTEGER,
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
    }
}, {
    timestamps: false
});

(async () => {
    await Usuario.sync();
    console.log('Tabela de usuários criada ou já existe.');
})();
export default Usuario;