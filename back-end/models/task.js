import { DataTypes } from 'sequelize';
import sequelize from '../db.js';
import Usuario from './usuario.js';


const Task = sequelize.define('tarefas', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    texto: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    usuarioId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Usuario,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    }
}, {
    timestamps: false
});

// Associação: Uma tarefa pertence a um usuário
Task.belongsTo(Usuario, { foreignKey: 'usuarioId' });


(async () => {
    await Task.sync();
    console.log('Tabela de tarefas criada ou já existe.');
})();

export default Task;