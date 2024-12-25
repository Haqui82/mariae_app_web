const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const config = require('./config/config'); // Importa la configuración centralizada
const app = express();
const port = process.env.PORT || config.server.port;

// Middleware
app.use(cors());
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Establecer Content-Security-Policy
app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; font-src 'self'; connect-src 'self'"
  );
  next();
});

// Servir archivos estáticos desde el directorio 'Front-End'
app.use(express.static(path.join(__dirname, 'Front-End')));

// Ruta para servir el archivo index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'Front-End', 'html', 'index.html'));
});

// Importar y usar las rutas de post.js con el prefijo /api
const postRoutes = require('./routes/post');
app.use('/api', postRoutes);

// Conectar a la base de datos usando Sequelize
const sequelize = config.db;

sequelize.authenticate()
  .then(() => {
    console.log('Conectado a MariaDB usando Sequelize');
  })
  .catch(err => {
    console.error('No se pudo conectar a la base de datos:', err);
  });

// Iniciar el servidor
const server = app.listen(port, () => {
  console.log(`Servidor ejecutándose en http://localhost:${port}`);
});

// Manejo de eventos de cierre para liberar el puerto
function handleShutdown() {
  console.log('Cerrando servidor...');
  server.close(() => {
    console.log('Servidor cerrado.');
    process.exit(0);
  });
}

// Para manejar Ctrl+C
process.on('SIGINT', handleShutdown);
// Para manejar otras señales de terminación
process.on('SIGTERM', handleShutdown);

module.exports = app;
