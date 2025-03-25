const { DataTypes,  Model } = require('sequelize');
const { db } = require('../config/database');

class User extends Model{
}

User.init({
  id_usuario: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notNull: {
        msg: 'Email não pode ser nulo'
      },
      notEmpty: {
        msg: 'Email não pode estar vazio'
      }
    }
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Senha não pode ser nula'
      },
      notEmpty: {
        msg: 'Senha não pode estar vazia'
      }
    }
  },
}, {
  sequelize: db,
  tableName: "usuario",
  timestamps: false,
});

module.exports = User;