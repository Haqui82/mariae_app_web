const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const app = express();
const port = process.env.PORT || 10000;

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

// Sirve archivos estáticos desde el directorio 'Front-End'
app.use(express.static(path.join(__dirname, 'Front-End', 'MariaE-App_FrontEnd', 'html')));

// Ruta para servir el archivo index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'Front-End', 'MariaE-App_FrontEnd', 'html', 'index.html'));
});

// Importar y usar las rutas de post.js con el prefijo /api
const postRoutes = require('./post');
app.use('/api', postRoutes);

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor ejecutándose en http://localhost:${port}`);
});
