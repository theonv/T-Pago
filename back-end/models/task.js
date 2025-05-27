import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

const Task = sequelize.define('tarefas', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    texto: {
        type: DataTypes.STRING(30),
        allowNull: false
    }
}, {
    timestamps: false
});

(async () => {
    await Task.sync();
    console.log('Tabela de tarefas criada ou já existe.');
})();

export default Task;