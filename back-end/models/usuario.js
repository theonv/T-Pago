
import { DataTypes } from 'sequelize';
import sequelize from '../db.js';
import bcrypt from 'bcrypt';

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
        allowNull: false,
        unique: true
    },
    senha: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    foto_perfil: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    imagem_fundo: {
        type: DataTypes.STRING(255),
        allowNull: true
    }

}, {
    timestamps: false,
    hooks: {
        beforeCreate: async (user) => {
            if (user.senha) {
                user.senha = await bcrypt.hash(user.senha, 10);
            }
        },
        beforeUpdate: async (user) => {
            if (user.changed('senha')) {
                user.senha = await bcrypt.hash(user.senha, 10);
            }
        }
    }
});

export default User;