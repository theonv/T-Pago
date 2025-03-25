const { DataTypes,  Model } = require('sequelize');
const { db } = require('../config/database');

class User extends Model{
  constructor(){
    super();
    this.id_usuario = undefined;
    this.nome = "";
    this.email = "";
    this.senha = ""
  }
  setId(id_usuario){
    this.id_usuario = id_usuario;
  }
  getId(){
    return this.id_usuario;
  }
  setNome(nome){
    this.nome = nome;
  }
  getNome(){
    return this.nome;
  }
  setEmail(email){
    this.email = email;
  }
  getEmail(){
    return this.email;
  }
  setSenha(senha){
    this.senha = senha;
  }
  getSenha(){
    return this.senha;
  }
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
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
  },
},
{
  sequelize: db,
  tableName: "usuario",
  timestamps: false,
}
);
module.exports = User;
