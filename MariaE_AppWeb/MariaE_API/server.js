const express = require('express'); // Importa el módulo express
const bodyParser = require('body-parser'); // Importa el módulo body-parser para analizar cuerpos de solicitudes
const cors = require('cors'); // Importa el módulo cors para habilitar CORS
const helmet = require('helmet'); // Importa el módulo helmet para mejorar la seguridad mediante encabezados HTTP
const app = express(); // Crea una instancia de una aplicación Express
const port = 10000; // Define el puerto en el cual el servidor escuchará

// Middleware
app.use(cors()); // Habilita CORS para permitir solicitudes entre dominios
app.use(helmet()); // Usa helmet para establecer varios encabezados de seguridad HTTP
app.use(bodyParser.urlencoded({ extended: true })); // Configura body-parser para analizar cuerpos de solicitudes URL codificadas
app.use(bodyParser.json()); // Configura body-parser para analizar cuerpos de solicitudes en formato JSON

// Establecer Content-Security-Policy
app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; font-src 'self'; connect-src 'self'"
  ); // Configura la política de seguridad de contenidos (CSP) para permitir ciertos recursos
  next(); // Llama a la siguiente función de middleware en la cadena
});

// Importar y usar las rutas de post.js
const postRoutes = require('./routes/post');
app.use('/api', postRoutes); // Todas las rutas en post.js estarán bajo el endpoint /api

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor ejecutándose en http://localhost:${port}`); // Mensaje de confirmación al iniciar el servidor
});
