import { DataTypes } from 'sequelize';
import sequelize from '../db.js'; 
import Usuario from './usuario.js';

const Tarefa = sequelize.define('tarefa', {
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
            model: Usuario,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    }
}, {
    timestamps: false
});

Tarefa.belongsTo(Usuario, { foreignKey: 'FK_USUARIO_id' });

(async () => {
    await Tarefa.sync();
    console.log('Tabela de taks criada ou já existe.');
})();
export default Tarefa;