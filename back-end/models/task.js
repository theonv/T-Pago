import { DataTypes } from 'sequelize';
import sequelize from '../db.js'; 
import User from './usuario.js';

const Task = sequelize.define('tarefa', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    descricao: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    concluida: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    data: {
        type: DataTypes.DATE,
        allowNull: true
    },
    lembrete: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    FK_USUARIO_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    }
}, {
    timestamps: false
});

Task.belongsTo(User, { foreignKey: 'FK_USUARIO_id' });

(async () => {
    await Task.sync({ alter: true });
    console.log('Tabela de tarefas criada ou já existe.');
})();
export default Task;