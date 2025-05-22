import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config();

const sequelize = new Sequelize(
    process.env.MARIADB_DATABASE,
    process.env.MARIADB_USER,
    process.env.MARIADB_PASSWORD, 
    {
        host: 'localhost',
        dialect: 'mariadb', 
        port: process.env.MARIADB_PORT,
    }
);

export default sequelize;