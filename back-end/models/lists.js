import { DataTypes } from 'sequelize';
import sequelize from '../db.js';
import User from './usuario.js';
import Task from './task.js';

const List = sequelize.define('lista', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING(40),
        allowNull: false
    },
    itens: {
        type: DataTypes.STRING(255),
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
    },
    FK_TAREFA_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Task,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    }
}, {
    timestamps: false
});


List.belongsTo(User, { foreignKey: 'FK_USUARIO_id' });
List.belongsTo(Task, { foreignKey: 'FK_TAREFA_id' });


(async () => {
    await List.sync({ alter: true });
    console.log('Tabela de listas criada ou já existe.');
})();
export default List;