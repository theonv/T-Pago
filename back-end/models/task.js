import { DataTypes } from 'sequelize';
import sequelize from '../db.js';
import Usuario from './usuario.js';



const Tarefa = sequelize.define('tarefa', {
    id_tarefa: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    descricao: {
        type: DataTypes.TEXT,
        allowNull: true
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
    FK_USUARIO_id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Usuario,
            key: 'id_usuario'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    }
}, {
    timestamps: false
});

Tarefa.belongsTo(Usuario, { foreignKey: 'FK_USUARIO_id_usuario' });

(async () => {
    await Tarefa.sync();
    console.log('Tabela de taks criada ou já existe.');
})();
export default Tarefa;