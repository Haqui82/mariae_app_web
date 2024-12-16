const { Sequelize } = require('sequelize');

// Configura la conexión a la base de datos
const sequelize = new Sequelize('mariae_fashiongirls', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;
