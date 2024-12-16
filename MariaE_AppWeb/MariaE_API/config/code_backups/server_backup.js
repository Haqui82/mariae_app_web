const express = require('express'); // Importa el módulo express
const bodyParser = require('body-parser'); // Importa el módulo body-parser para analizar cuerpos de solicitudes
const cors = require('cors'); // Importa el módulo cors para habilitar CORS
const helmet = require('helmet'); // Importa el módulo helmet para mejorar la seguridad mediante encabezados HTTP
const sequelize = require('./db'); // Importa la configuración de la base de datos desde db.js
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

// Ruta para crear cliente
app.post('/create', async (req, res) => {
  const { id_tipo_documento, id_cliente, nombre_cliente, dirección_cliente, celular_cliente, password_cliente } = req.body; // Extrae datos del cuerpo de la solicitud

  try {
    // Ejecuta una consulta para insertar un nuevo cliente en la base de datos
    await sequelize.query(
      `INSERT INTO clientes (id_tipo_documento, id_cliente, nombre_cliente, dirección_cliente, celular_cliente, password_cliente) VALUES (?, ?, ?, ?, ?, ?)`,
      {
        replacements: [id_tipo_documento, id_cliente, nombre_cliente, dirección_cliente, celular_cliente, password_cliente], // Reemplaza los placeholders con los valores reales
        type: sequelize.QueryTypes.INSERT // Especifica que esta consulta es una inserción
      }
    );
    res.status(201).send('Registro exitoso'); // Envía una respuesta de éxito
  } catch (err) {
    console.error(err); // Registra cualquier error en la consola
    res.status(500).send('Error en el registro'); // Envía una respuesta de error
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor ejecutándose en http://localhost:${port}`); // Mensaje de confirmación al iniciar el servidor
});  
