import { DataTypes } from 'sequelize';
import sequelize from '../db.js';
import Usuario from './usuario.js';
import Tarefa from './task.js';

const Lista = sequelize.define('lista', {
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
    data: {
        type: DataTypes.DATE,
        allowNull: true
    },
    FK_USUARIO_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Usuario,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    FK_TAREFA_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Tarefa,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    }
}, {
    timestamps: false
});


Lista.belongsTo(Usuario, { foreignKey: 'FK_USUARIO_id' });
Lista.belongsTo(Tarefa, { foreignKey: 'FK_TAREFA_id' });


(async () => {
    await Lista.sync();
    console.log('Tabela de listas criada ou já existe.');
})();
export default Lista;