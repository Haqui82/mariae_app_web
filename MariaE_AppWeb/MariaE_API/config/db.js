const { Sequelize } = require('sequelize');
require('dotenv').config(); // Cargar variables de entorno desde .env

const sequelize = new Sequelize(
 
  {
    name: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    dialect: 'mysql',
    port: process.env.DB_PORT, // Asegúrate de que DB_PORT esté correcto
    dialectOptions: {
      connectTimeout: 30000 // Puedes aumentar el tiempo de espera si es necesario
    }
  }
);

module.exports = sequelize;
