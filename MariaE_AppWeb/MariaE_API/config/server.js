const express = require('express'); // Importa el módulo express
const bodyParser = require('body-parser'); // Importa el módulo body-parser para analizar cuerpos de solicitudes
const cors = require('cors'); // Importa el módulo cors para habilitar CORS
const helmet = require('helmet'); // Importa el módulo helmet para mejorar la seguridad mediante encabezados HTTP
const mysql = require('mysql2/promise'); // Importa el módulo mysql2 para la conexión a la base de datos MariaDB con promesas
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

// Conexión a la base de datos MariaDB
const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'mariae_fashiongirls'
});

// Ruta para crear cliente
app.post('/create', async (req, res) => {
  const { fullName, doc_type, doc_num, email, phone, address, password, confirmPassword } = req.body; // Extrae datos del cuerpo de la solicitud

  try {
    const [results] = await connection.query(
      `INSERT INTO clientes (id_tipo_documento, nombre_cliente, dirección_cliente, celular_cliente, password_cliente, num_doc_cliente, e_mail) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [doc_type, fullName, address, phone, password, doc_num, email ] // Reemplaza los placeholders con los valores reales
    );
    res.status(201).json({ success: true, message: 'Registro exitoso' }); // Envía una respuesta de éxito
  } catch (error) {
    console.error(error); // Registra cualquier error en la consola
    if (!res.headersSent) {
      res.status(500).json({ success: false, message: 'Error en el registro', error: error.message }); // Envía una respuesta de error
    }
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor ejecutándose en http://localhost:${port}`); // Mensaje de confirmación al iniciar el servidor
});
