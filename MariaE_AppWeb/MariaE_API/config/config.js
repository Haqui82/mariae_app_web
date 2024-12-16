const db = require('./db');
require('dotenv').config(); // Cargar variables de entorno desde .env
const configJson = require('./config.json');

const config = {
  server: {
    port: process.env.SERVER_PORT || configJson.server.port // Asegurando que SERVER_PORT se utiliza
  },
  db
};

module.exports = config;
