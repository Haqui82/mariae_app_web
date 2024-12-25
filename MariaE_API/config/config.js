require('dotenv').config(); // Cargar variables de entorno desde .env
const db = require('./db');

const config = {
  server_port: process.env.SERVER_PORT,
  db,
  db_port: process.env.DB_PORT
};

module.exports = config;
