import { DataTypes } from 'sequelize';
import sequelize from '../db.js';
import User from './usuario.js';

const Imagem = sequelize.define('imagem', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    usuarioId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    caminho: {
        type: DataTypes.STRING(255),
        allowNull: false
    }
}, {
    timestamps: false
});

// Definindo o relacionamento
User.hasMany(Imagem, { foreignKey: 'usuarioId' });
Imagem.belongsTo(User, { foreignKey: 'usuarioId' });

export default Imagem;
