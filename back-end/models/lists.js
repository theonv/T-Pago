import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

const List = sequelize.define('listas', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING(40),
        allowNull: false
    },
    itens {
        type: DataTypes.STRING(40),
        allowNull: true
    }
}, {
    timestamps: false
});

(async () => {
    await List.sync();
    console.log('Tabela de listas criada ou já existe.');
})();

export default List;